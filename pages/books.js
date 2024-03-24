import Head from "next/head";
import styles from "../styles/books.module.css";
import Header from "../components/Header";
import RandomVideo from "../js/randomBg";
import { useEffect, useState } from "react";
import kv from "@vercel/kv";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!kv.get("books")) {
        const response = await fetch("/book.json");
        const bookData = await response.json();

        kv.set("books", bookData);
        setBooks(bookData);
      } else {
        const bookData = await kv.get("books");
        setBooks(bookData);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>土撥鼠圖書館 | 書籍資訊</title>
        <link rel="icon" href="/icon.ico" />
        <meta
          name="viewport"
          content="width=device-width,height=device-height,initial-scale=1.0"
        />
      </Head>

      <div>
        <RandomVideo />
      </div>

      <main>
        <Header />
        <h1 className={styles.title}>書籍詳情</h1>

        <div className={styles.textSpace}>這是顯示書籍詳細資訊的地方</div>
        <div className={styles.bookContainer}>
          <div className={styles.bookList}>
            {books.map((book) => (
              <a
                key={book.id}
                href={`/book/${book.id}`}
                className={styles.books}
              >
                {book.image && (
                  <img
                    src={book.image}
                    alt={book.title}
                    className={styles.image}
                    draggable="false"
                  />
                )}
                <h3 className={styles.bookName}>{book.title}</h3>
                <p className={styles.bookDesc}>{book.description}</p>
                <h3 className={styles.bookStatus}>
                  {book.status ? "✔️可借用" : `❌已被${book.borrower}借用`}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
