"use client";
import { motion, Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { buttonVariants } from "../ui/button";
import Image from "next/image";
import { searchBooks } from "@/lib/actions/books.action";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { Ghost } from "lucide-react";

const books = [
  { title: "To Kill a Mockingbird", author: "Harper Lee" },
  { title: "1984", author: "George Orwell" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger" },
  { title: "Moby-Dick", author: "Herman Melville" },
];

interface BookSelectProps {
  onBookSelect: (book: string) => void;
}

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  closed: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const searchBoxVariants: Variants = {
  open: {
    zIndex: 20,
    clipPath: "inset(0% 0% 0% 0% round 12px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: "inset(0% 50% 100% 50% round 12px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
    },
  },
};

const BookSelect = ({ onBookSelect }: BookSelectProps) => {
  // state to manage the open and closing of search box
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // search state
  const [searchTerm, setSearchTerm] = useState<string>("");

  // searched books state
  const [searchedResults, setSearchedResults] = useState<
    { title: string; author: string; coverId: string }[]
  >([]);

  // loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const get books from database
  const handleBookSearch = async () => {
    setIsLoading(true);
    try {
      // fetch the books from the server actions
      const books = await searchBooks({
        title: searchTerm,
        limit: 10,
      });

      // set books
      setSearchedResults((prev) => books);
    } catch (error) {
      toast.error("Failed to search books!, try again later");
      throw new Error("Failed to search books");
    } finally {
      setIsLoading(false);
    }
  };

  // handle book select (set it to active books in the parent state)
  const handleBookSelect = (book: { title: string }) => {
    onBookSelect(book.title);
  };

  // close the search box if anywhere outside the box is clicked
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        inputRef.current!.value = "";
        setSearchTerm("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className="relative">
        <motion.div
          className="w-full gap-4 flex mt-4"
          initial={false}
          animate={isOpen ? "open" : "closed"}
        >
          <input
            className="border rounded-xl py-1 px-4 text-sm outline-none flex-grow"
            placeholder="Search for a book..."
            ref={inputRef}
            onBlur={(e) => setSearchTerm(e.target.value)}
          />

          <motion.div
            ref={searchButtonRef}
            whileTap={{
              scale: 0.9,
            }}
            disabled={isLoading}
            onClick={() => {
              // donot query the server if the search term is empty
              if (!searchTerm) return toast.warning("Search is empty!");

              if (isOpen === false) {
                setIsOpen(true);
              }

              // fetch the books from the server actions
              handleBookSearch();
            }}
            className={`${buttonVariants({
              variant: "secondary",
            })} cursor-pointer`}
          >
            {isLoading ? "..." : "Search"}
          </motion.div>

          {/* search box */}
          <motion.div
            className="flex flex-col  gap-4  rounded-xl absolute top-16 w-full overflow-y-auto h-[800px] px-6 py-4 border  bg-gray-50 search-box"
            ref={searchRef}
            variants={searchBoxVariants}
          >
            <h3 className="text-center text-xl font-bold tracking-tight">
              Search Results 📚
            </h3>
            {isLoading ? (
              <>
                {/* if is loading render skeletons */}
                {Array.from({ length: 5 }).map((_, index) => {
                  return (
                    <motion.div variants={itemVariants} key={index}>
                      <div className="flex gap-6 items-center">
                        <Skeleton className="w-[100px] h-[200px]" />
                        <div className="flex flex-col gap-2">
                          <Skeleton className="w-[200px] h-[20px]" />
                          <Skeleton className="w-[100px] h-[15px]" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </>
            ) : (
              <>
                {/* if loading is finished and result is found render searched results otherwise render undefined */}
                <div className="flex flex-col">
                  {searchedResults.length > 0 ? (
                    <>
                      {searchedResults.map((book, index) => {
                        const noBorder = index === books.length - 1;

                        return (
                          <motion.div
                            variants={itemVariants}
                            key={book.author + index}
                            className={`${
                              noBorder
                                ? ""
                                : "border border-gray-300 border-x-0 border-t-0"
                            } py-4 cursor-pointer`}
                            // on click select the book
                            onClick={() => {
                              handleBookSelect(book);
                              // close the search box
                              inputRef.current!.value = "";
                              setSearchTerm("");
                              setIsOpen(false);
                            }}
                          >
                            <div className="flex items-center gap-6">
                              <Image
                                src={book.coverId}
                                alt="cover"
                                className="object-contain"
                                width={100}
                                height={200}
                              />
                              <div className="flex flex-col gap-2">
                                <div className="text-base font-semibold">
                                  {book.title}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {book.author}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <div className="text-center  flex flex-col gap-4 items-center mt-6">
                        <Ghost className="w-16 h-16" />
                        <div className="text-lg font-bold">
                          No books found! Please try a different search term.
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default BookSelect;
