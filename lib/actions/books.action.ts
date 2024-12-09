"use server";

// open library api actions
export const getBooks = async () => {
  const books = await fetch(`${process.env.GET_BOOKS_SEARCH_URL}?`);

  const data = await books.json();

  console.log(data);

  // console.log(data.docs.length);
};

export const searchBookTitles = async (title: string) => {
  try {
    if (title.length > 0) {
      const books = await fetch(
        `${process.env.GET_BOOKS_SEARCH_URL}?title=${title}&limit=10`
      );
      const data = await books.json();

      const booksToDisplay: { title: string; author: string }[] = [];

      data.docs.map((book: { title: string; author_name: string }) => {
        booksToDisplay.push({
          title: book.title,
          author: book.author_name ? book.author_name[0] : "",
        });
      });

      return booksToDisplay;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching books");
  }
};

interface SearchBooksParams {
  title?: string;
  author?: string;
  subject?: string;
  type: string;
}

export const searchBooks = async (params: SearchBooksParams) => {
  try {
    const { title, author, subject, type } = params;

    if (type === "interests") {
      const books = await fetch(
        `${process.env.GET_BOOKS_SEARCH_URL}?title=${title}&author=${author}&subject=${subject}&limit=10`
      );
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching books");
  }
};
