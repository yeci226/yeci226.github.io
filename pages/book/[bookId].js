import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RandomVideo from "../../js/randomBg";
import Header from "../../components/Header";
import styles from "../../styles/book.module.css";
import moment from "moment";
import accountData from "../../public/account.json";

export default function Book() {
  const router = useRouter();
  const { bookId } = router.query;
  const [book, setBook] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchBookData = async () => {
      const response = await fetch(`/book.json`);
      const bookData = await response.json();
      const selectedBook = bookData.find(
        (book) => book.id === parseInt(bookId, 10)
      );
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
    setLoggedInUser(loggedInUser);
  }, [bookId]);

  const isAdmin =
    loggedInUser &&
    accountData.find((user) => user.username === loggedInUser)?.admin;

  const handleBorrow = async (bookId) => {
    if (!loggedInUser) {
      window.alert("請先登入");
      return;
    }

    if (book.status !== null) {
      window.alert(`${book.title} 已被借用`);
      return;
    }

    const response = await fetch(`/api/updateBookStatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId: bookId,
        status: moment().format("YYYY-MM-DD HH:mm:ss"),
        borrower: loggedInUser,
        method: "update",
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
  };

  const handleDelete = async (bookId) => {
    if (!loggedInUser) {
      window.alert("請先登入");
      return;
    }

    if (isAdmin !== true) {
      window.alert(`你沒有權限刪除 ${book.title}`);
      return;
    }

    const response = await fetch(`/api/updateBookStatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId: bookId,
        status: moment().format("YYYY-MM-DD HH:mm:ss"),
        borrower: loggedInUser,
        method: "delete",
      }),
    });

    if (response.ok) {
      window.alert(`你已成功刪除 ${book.title}`);
      router.push("/books");
    } else {
      window.alert("刪除書籍失敗");
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
            {book.status === null ? "✔️可借用" : `❌已被${book.borrower}借用`}
          </h3>
          <button
            className={`${styles.borrowButton} ${
              book.status !== null || !loggedInUser ? styles.disabled : ""
            }`}
            onClick={() => handleBorrow(bookId)}
            disabled={book.status !== null || !loggedInUser}
          >
            {!loggedInUser ? "請先登入" : "借用"}
          </button>

          {isAdmin && (
            <button
              className={`${styles.deleteButton} ${
                book.status !== null || !loggedInUser ? styles.disabled : ""
              }`}
              onClick={() => handleDelete(bookId)}
              disabled={book.status !== null || !loggedInUser}
            >
              刪除
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
