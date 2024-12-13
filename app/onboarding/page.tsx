"use client";

// import constants
import { AUTHORS, SUBJECTS } from "@/constants";

import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import EmojiButton from "@/components/shared/EmojiButton";
import React, { useState } from "react";
import { toast } from "sonner";
import { completeUserOnboarding } from "@/lib/actions/users.action";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import GenreSelect from "@/components/onboarding/GenreSelect";
import AuthorSelect from "@/components/onboarding/AuthorSelect";
import BookSelect from "@/components/onboarding/BookSelect";
import { X } from "lucide-react";

export default function OnBoardingComponent() {
  const { user } = useUser();
  const router = useRouter();

  // loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // genre selection states and logic
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

  // author selection states and logic
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

  // books selection states and logic
  const [books, setBooks] = useState<string[]>([]);

  const handleBookSelect = async (book: string) => {
    if (!books.includes(book)) {
      setBooks((prev) => [...prev, book]);
    } else {
      toast("You have already selected this book!");
    }
  };

  // remove book from the active books list
  const handleBookDiselect = (book: string) => {
    setBooks((prev) => prev.filter((b) => b !== book));
  };

  // on form submit
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // only allow to submit if the user has selected atleast 3 genres
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

    const selectedSubjects = {
      subjects: subjects
        .filter((subject) => subject.selected)
        .map((s) => s.name),
    };

    const selectedAuthors = authors
      .filter((author) => author.selected)
      .map((a) => a.name);

    const selectedBooks = books;

    // complete the onboarding process and then redirect to dashboard

    try {
      setIsLoading(true);
      toast("Completing onboarding process, please wait...");
      const res = await completeUserOnboarding({
        authors: selectedAuthors,
        genres: selectedSubjects.subjects,
        books: selectedBooks,
      });

      if (res?.message) {
        // Reloads the user's data from the Clerk API
        console.log("redirecting to dashboard");
        await user?.reload();
        router.push("/dashboard");
      }
      if (res?.error) {
        toast.error(res?.error);
      }
    } catch (error) {
      toast.error("Failed to complete onboarding process!, try again later.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

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
          <form onSubmit={(e) => onSubmit(e)} className="space-y-12 mt-12">
            {/* get the genres from the user */}
            <GenreSelect
              subjects={subjects}
              onSubjectSelect={handleSubjectSelect}
            />

            <div>
              <h2 className="text-base sm:text-xl font-semibold tracking-tight">
                What are your best reads?
              </h2>
              {/* selected books */}
              <div className="flex flex-wrap my-4 gap-6">
                {books.map((book, index) => {
                  return (
                    <div
                      key={book + index}
                      className="bg-orange-100 text-orange-600 font-medium border-orange-500 flex gap-1 items-center shadow-sm px-4 py-1 border rounded-2xl text-sm "
                    >
                      <X
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => handleBookDiselect(book)}
                      />
                      {book} <span>📚</span>
                    </div>
                  );
                })}
              </div>

              {/* select the book from the user */}
              <BookSelect onBookSelect={handleBookSelect} />
            </div>

            {/* get the authors */}
            <AuthorSelect
              authors={authors}
              onAuthorSelect={handleAuthorSelect}
            />

            <Button asChild type="submit" disabled={isLoading}>
              <EmojiButton label="Get Started" emoji="🚀" />
            </Button>
          </form>
        </main>
      </MaxWidthWrapper>
    </>
  );
}
