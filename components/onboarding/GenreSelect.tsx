import React from "react";

interface GenreSelectProps {
  subjects: {
    id: number;
    name: string;
    emoji: string;
    selected: boolean;
  }[];
  onSubjectSelect: (id: number) => void;
}

const GenreSelect = ({ subjects, onSubjectSelect }: GenreSelectProps) => {
  return (
    <>
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
                  onClick={() => onSubjectSelect(subject.id)}
                >
                  {subject.name} {subject.emoji}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GenreSelect;
