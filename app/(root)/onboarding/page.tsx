"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
// import constants
import { AUTHORS, SUBJECTS } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import debounce from "lodash.debounce";
import EmojiButton from "@/components/shared/EmojiButton";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import BookSearchResult from "@/components/BookSearchResult";
import { searchBookTitles } from "@/lib/actions/books.action";
import { toast } from "sonner";
import { completeUserOnboarding } from "@/lib/actions/users.action";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const formSchema = z.object({});

export default function OnBoardingComponent() {
  const { user } = useUser();
  const router = useRouter();

  const [subjects, setSubjects] =
    useState<{ id: number; name: string; emoji: string; selected: boolean }[]>(
      SUBJECTS
    );

  const handleSubjectSelect = (id: number) => {
    const updatedSubjects = subjects.map((subject) => {
      if (subject.id === id) {
        return { ...subject, selected: !subject.selected };
      }
      return subject;
    });

    setSubjects(updatedSubjects);
  };

  const [authors, setAuthors] =
    useState<{ id: number; name: string; emoji: string; selected: boolean }[]>(
      AUTHORS
    );

  const handleAuthorSelect = (id: number) => {
    const updatedAuthors = authors.map((author) => {
      if (author.id === id) {
        return { ...author, selected: !author.selected };
      }
      return author;
    });

    setAuthors(updatedAuthors);
  };

  // books
  const [books, setBooks] = useState<{ title: string; author: string }[]>([]);

  const handleBookSelect = (title: string, author: string) => {
    setBooks((prev) => {
      if (prev.some((book) => book.title === title && book.author === author)) {
        return prev;
      }
      return [
        ...prev,
        {
          title: title,
          author: author,
        },
      ];
    });
  };

  const handleBookRemove = (title: string, author: string) => {
    setBooks((prev) =>
      prev.filter((book) => book.title !== title || book.author !== author)
    );
  };

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchResults, setSearchResults] = useState<
    { title: string; author: string }[]
  >([]);

  const handleSearch = async (searchTerm: string) => {
    try {
      setIsLoading(true);
      const result = await searchBookTitles(searchTerm);
      if (result) {
        setSearchResults(result);
      }
    } catch (error) {
      console.log(error);
      throw Error("Error fetching books");
    } finally {
      setIsLoading(false);
    }
  };

  const debounceSearch = debounce(
    async (searchTerm: string) => await handleSearch(searchTerm),
    300
  );

  const debounceRequest = useCallback(
    (searchTerm: string) => debounceSearch(searchTerm),
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debounceRequest(e.target.value);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (subjects.filter((subject) => subject.selected).length < 3) {
      toast.error("Please select atleast 3 genres!");
      return;
    }

    // check if the user has selected atleast 1 author
    if (authors.filter((author) => author.selected).length === 0) {
      toast.error("Please select atleast 1 author!");
      return;
    }

    // check if the user has selected atleast 1 book
    if (books.length === 0) {
      toast.error("Please select atleast 1 book!");
      return;
    }

    const userInterests = {
      subjects: subjects
        .filter((subject) => subject.selected)
        .map((s) => s.name),
    };

    // todo: generate reccomendation using chatgpt and then show that book to the user to either add in their list or straight up go to dashboard

    // change the middleware to redirect to the dashboard
    const res = await completeUserOnboarding({ userInterests });
    if (res?.message) {
      // Reloads the user's data from the Clerk API
      console.log("redirecting to dashboard");
      await user?.reload();
      router.push("/dashboard");
    }
    if (res?.error) {
      toast.error(res?.error);
    }
  }

  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setOpen(false);
        setSearchTerm("");
      }
    };

    setOpen(false);

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <MaxWidthWrapper>
        <main className=" mt-4 sm:mt-16 shadow-md py-6 px-4 rounded-2xl">
          <h1 className="text-xl sm:text-3xl font-bold tracking-tighter">
            Discover your next favourite read! 📕
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-1">
            Tell us about your favorite genres, books, and authors, and we’ll
            recommend titles you&apos;ll love. 🎉
          </p>
          <form
            onSubmit={(e) => onSubmit(e)}
            className="space-y-12 mt-12"
            ref={searchContainerRef}
          >
            {/* get the genres from the user */}
            <div>
              <h2 className="text-base sm:text-xl font-semibold tracking-tight">
                Choose atleast 3 of your favourite genres!
              </h2>
              <div className="flex gap-6 flex-wrap mt-4">
                {subjects.map((subject) => {
                  return (
                    <React.Fragment key={subject.id}>
                      <div
                        className={` flex gap-1 items-center shadow-sm px-4 py-1 border rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-150 text-sm ${
                          subject.selected
                            ? "bg-orange-100 text-orange-600 font-medium border-orange-500"
                            : ""
                        }`}
                        onClick={() => handleSubjectSelect(subject.id)}
                      >
                        {subject.name} {subject.emoji}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* get the authors */}
            <div>
              <h2 className="text-base sm:text-xl font-semibold tracking-tight">
                Who Are Your Favorite Authors?
              </h2>
              <div className="flex gap-6 flex-wrap mt-4">
                {authors.map((author) => {
                  return (
                    <React.Fragment key={author.id}>
                      <div
                        className={` flex gap-1 items-center shadow-sm px-4 py-1 border rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-150 text-sm ${
                          author.selected
                            ? "bg-orange-100 text-orange-600 font-medium border-orange-500"
                            : ""
                        }`}
                        onClick={() => handleAuthorSelect(author.id)}
                      >
                        {author.name} {author.emoji}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* get atleast 1 book */}
            <div className="relative">
              <h2 className="text-base font-semibold sm:text-xl tracking-tight mb-4">
                What are your favourite books?
              </h2>
              <div className=" flex flex-wrap gap-6">
                {books.map((book, index) => {
                  return (
                    <div
                      key={index}
                      className="px-4 flex gap-1 items-center shadow-sm py-1 rounded-2xl bg-orange-100 text-orange-600 font-medium border-orange-500 border text-sm"
                    >
                      <X
                        size={14}
                        className="cursor-pointer min-h-[14px] min-w-[14px]"
                        onClick={() =>
                          handleBookRemove(book.title, book.author)
                        }
                      />
                      {book.title} by {book.author}
                    </div>
                  );
                })}
              </div>
              <Input
                className="mt-4 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0  outline-none text-sm border rounded-2xl px-4"
                placeholder="Search for your favourite books..."
                value={searchTerm}
                onChange={(e) => {
                  onChange(e);

                  if (!open) {
                    setOpen(true);
                  }

                  if (e.target.value === "") {
                    setOpen(false);
                  }
                }}
              />

              {open && searchResults && (
                <>
                  <BookSearchResult
                    books={searchResults}
                    isLoading={isLoading}
                    onSelect={handleBookSelect}
                  />
                </>
              )}
            </div>

            <Button asChild type="submit">
              <EmojiButton label="Get Started" emoji="🚀" />
            </Button>
          </form>
        </main>
      </MaxWidthWrapper>
    </>
  );
}
