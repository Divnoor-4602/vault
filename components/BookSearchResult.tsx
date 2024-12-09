"use client";

import { Loader2 } from "lucide-react";
import React from "react";

interface BookSearchResultProps {
  isLoading: boolean;
  books: { title: string; author: string }[];
  onSelect: (title: string, author: string) => void;
}

const BookSearchResult = ({
  isLoading,
  books,
  onSelect,
}: BookSearchResultProps) => {
  console.log(books);
  return (
    <div className="absolute rounded-2xl w-full bg-white shadow-lg z-20 border mt-4 overflow-y-auto max-h-[500px]">
      <div className="flex flex-col gap-4 my-4">
        <h1 className="text-center font-bold tracking-tighter text-xl text-gray-800">
          Search Results
        </h1>
        <div className="w-full">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="animate-spin" size={24} />
            </div>
          ) : (
            <>
              {books && books.length > 0 ? (
                books.map((book, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                    onClick={() => onSelect(book.title, book.author)}
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {book.title}
                    </div>
                    <div className="text-xs text-gray-600">{book.author}</div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">
                  No results found.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSearchResult;
