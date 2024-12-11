"use server";

import { BookParams, SearchBookParams } from "./shared.types";

export const searchBooks = async (params: SearchBookParams) => {
  try {
    const { title, author, genre, limit, type } = params;

    let searchQuery = "";

    switch (type) {
      case "title":
        searchQuery = `title=${title}`;
        break;
      case "author":
        searchQuery = `author=${author}`;
        break;
      case "genre":
        searchQuery = `subject=${genre}`;
        break;
      default:
        searchQuery = `q=${title}`;
        break;
    }

    const response = await fetch(
      `${process.env.GET_BOOKS_SEARCH_URL}?${searchQuery}&limit=${limit}`
    );

    const books = await response.json();

    const formattedBooks = books.docs.map((book: BookParams) => {
      return {
        title: book.title,
        author:
          book.author_name && book.author_name[0]
            ? book.author_name[0]
            : book.author_name,
        coverId: `${process.env.GET_BOOKS_COVER_URL}/${book.cover_i}-M.jpg`,
      };
    });

    return formattedBooks;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to search books");
  }
};
