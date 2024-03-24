import Head from "next/head";
import styles from "../styles/books.module.css";
import Header from "../components/Header";
import RandomVideo from "../js/randomBg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import kv from "@vercel/kv";

export default function List() {
  const router = useRouter();
  const { bookId } = router.query;
  const [book, setBook] = useState(null);
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const bookData = await kv.get("books");

      setBooks(bookData);
    };

    const cookies = document.cookie.split("; ");
    const loggedInUserCookie = cookies.find((cookie) =>
      cookie.startsWith("loggedInUser=")
    );
    const loggedInUser = loggedInUserCookie
      ? loggedInUserCookie.split("=")[1]
      : null;
    setLoggedInUsername(loggedInUser);
    fetchData();
  }, []);

  const handleReturn = async (book) => {
    if (loggedInUsername && !book.status) {
      const response = await fetch(`/api/updateBookStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: book.id,
          status: true,
          borrower: "",
        }),
      });

      if (response.ok) {
        window.alert(`你已成功歸還 ${book.title}`);
        const updatedBook = { ...book, status: false };
        setBook(updatedBook);
        router.reload();
      } else {
        window.alert("更新書籍狀態失敗");
      }
    } else if (!loggedInUsername) {
      window.alert("請先登入");
    } else {
      window.alert(`無法歸還 ${book.title}`);
    }
  };

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
        <h1 className={styles.title}>我的書籍</h1>

        <div className={styles.textSpace}>這是顯示我已借用書籍的地方</div>
        <div className={styles.bookContainer}>
          <div className={styles.bookList}>
            {books.map(
              (book) =>
                book.borrower === loggedInUsername && (
                  <a key={book.id} className={styles.books}>
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
                    <button
                      className={styles.returnBtn}
                      onClick={() => handleReturn(book)}
                    >
                      歸還
                    </button>{" "}
                  </a>
                )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
