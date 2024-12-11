import React from "react";

interface AuthorSelectProps {
  authors: {
    id: number;
    name: string;
    emoji: string;
    selected: boolean;
  }[];
  onAuthorSelect: (id: number) => void;
}

const AuthorSelect = ({ authors, onAuthorSelect }: AuthorSelectProps) => {
  return (
    <>
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
                  onClick={() => onAuthorSelect(author.id)}
                >
                  {author.name} {author.emoji}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AuthorSelect;
