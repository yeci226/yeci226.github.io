import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RandomVideo from "../../js/randomBg";
import Header from "../../components/Header";
import styles from "../../styles/book.module.css";

export default function Book() {
  const router = useRouter();
  const { bookId } = router.query;
  const [book, setBook] = useState(null);
  const [loggedInUsername, setLoggedInUsername] = useState(null);

  useEffect(() => {
    const fetchBookData = async () => {
      const response = await fetch(`/book.json`);
      const bookData = await response.json();
      const selectedBook = bookData.find((book) => {
        return book.id === parseInt(bookId, 10);
      });
      setBook(selectedBook);
    };

    if (bookId) {
      fetchBookData();
    }

    const cookies = document.cookie.split("; ");
    const loggedInUserCookie = cookies.find((cookie) =>
      cookie.startsWith("loggedInUser=")
    );
    const loggedInUser = loggedInUserCookie
      ? loggedInUserCookie.split("=")[1]
      : null;
    setLoggedInUsername(loggedInUser);
  }, [bookId]);

  const handleBorrow = async (bookId) => {
    if (loggedInUsername && book.status) {
      const response = await fetch(`/api/updateBookStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: bookId,
          status: false,
          borrower: loggedInUsername,
        }),
      });

      if (response.ok) {
        window.alert(`你已成功借用 ${book.title}`);
        const updatedBook = { ...book, status: false };
        setBook(updatedBook);
        router.push("/list");
      } else {
        window.alert("更新書籍狀態失敗");
      }
    } else if (!loggedInUsername) {
      window.alert("請先登入");
    } else {
      window.alert(`${book.title} 已被借用`);
    }
  };

  if (!book) {
    return <div>載入書籍失敗...</div>;
  }

  return (
    <div>
      <Header />
      <Head>
        <title>土撥鼠圖書館 | {book.title}</title>
        <link rel="icon" href={book.image ? book.image : "/icon.ico"} />
        <meta
          name="viewport"
          content="width=device-width,height=device-height,initial-scale=1.0"
        />
      </Head>

      <RandomVideo />
      <div className={styles.bookContainer}>
        <div className={styles.book}>
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
          <button
            className={`${styles.button} ${
              !book.status || !loggedInUsername ? styles.disabled : ""
            }`}
            onClick={() => handleBorrow(bookId)}
            disabled={!book.status || !loggedInUsername}
          >
            {!loggedInUsername ? "請先登入" : "借用"}
          </button>{" "}
        </div>
      </div>
    </div>
  );
}
