"use server";

export const getBooks = async () => {
  const books = await fetch(`${process.env.GET_BOOKS_SEARCH_URL}?`);

  console.log(await books.json());
};
