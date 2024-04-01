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
  const [borrowedBooksCount, setBorrowedBooksCount] = useState(null);
  const borrowBookLimit = 3;

  useEffect(() => {
    const fetchBookData = async () => {
      const response = await fetch(`/book.json`);
      const bookData = await response.json();
      const selectedBook = bookData.find(
        (book) => book.id === parseInt(bookId, 10)
      );
      const borrowedBooksCount = bookData.filter(
        (book) => book.borrower === loggedInUser
      ).length;
      setBook(selectedBook);
      setBorrowedBooksCount(borrowedBooksCount);
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
      router.push("/list");
    } else {
      window.alert("更新書籍狀態失敗");
    }
  };

  const handleCancel = async (bookId) => {
    if (!loggedInUser) {
      window.alert("請先登入");
      return;
    }

    if (book.status == null) {
      window.alert(`${book.title} 未被借用`);
      return;
    }

    const response = await fetch(`/api/updateBookStatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId: bookId,
        status: null,
        borrower: null,
        method: "update",
      }),
    });

    if (response.ok) {
      window.alert(`你已成功取消借用 ${book.title}`);
      router.reload();
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
        <div
          className={styles.returnIcon}
          onClick={() => window.history.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-arrow-left"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </div>
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
          <p className={styles.bookAuthor}>
            {book.author ? `作者 ${book.author}` : "作者未知"}
          </p>
          <p className={styles.bookDesc}>{book.description}</p>
          <h3 className={styles.bookStatus}>
            {book.status === null ? "✔️可借用" : `❌已被${book.borrower}借用`}
          </h3>
          {book.status == null && (
            <button
              className={`${styles.borrowButton} ${
                borrowedBooksCount >= borrowBookLimit ||
                book.status !== null ||
                !loggedInUser
                  ? styles.disabled
                  : ""
              }`}
              onClick={() => handleBorrow(bookId)}
              disabled={!loggedInUser || borrowedBooksCount >= borrowBookLimit}
            >
              {!loggedInUser
                ? "請先登入"
                : borrowedBooksCount >= borrowBookLimit
                ? "已達最大借用數量"
                : "借用"}
            </button>
          )}

          {(book.borrower == loggedInUser || isAdmin) &&
            book.status !== null && (
              <button
                className={styles.cancelButton}
                onClick={() => handleCancel(bookId)}
              >
                取消借用
              </button>
            )}

          {isAdmin && (
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(bookId)}
            >
              刪除
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
