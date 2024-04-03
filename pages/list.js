import Head from "next/head";
import styles from "../styles/books.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RandomVideo from "../js/randomBg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";

export default function List() {
  const router = useRouter();
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const borrowBookLimit = 3;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/book.json");
      const bookData = await response.json();

      setBooks(bookData);

      const cookies = document.cookie.split("; ");
      const loggedInUserCookie = cookies.find((cookie) =>
        cookie.startsWith("loggedInUser=")
      );
      const loggedInUser = loggedInUserCookie
        ? loggedInUserCookie.split("=")[1]
        : null;
      setLoggedInUsername(loggedInUser);
    };

    fetchData();
  }, []);

  const borrowedBooksCount = books.filter(
    (book) => book.borrower === loggedInUsername
  ).length;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReturn = async (book) => {
    if (loggedInUsername && book.status != null) {
      const response = await fetch(`/api/updateBookStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: book.id,
          status: null,
          borrower: null,
          method: "update",
        }),
      });

      if (response.ok) {
        window.alert(`你已成功歸還 ${book.title}`);
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

  function formatDuration(milliseconds) {
    const seconds = milliseconds / 1000;
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const parts = [];
    if (days > 0) parts.push(`${days} 天`);
    if (hours > 0) parts.push(`${hours} 小時`);
    if (minutes > 0) parts.push(`${minutes} 分鐘`);
    if (seconds < 60) parts.push(`${remainingSeconds} 秒`);

    return parts.join(" ");
  }

  return (
    <div>
      <Header />
      <Footer />
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
          <h1 className={styles.title}>我的書籍</h1>
          <div className={styles.textSpace}>這是顯示我已借用書籍的地方</div>

          <input
            className={styles.searchBar}
            type="text"
            placeholder="搜尋我的書籍..."
            value={searchTerm}
            onChange={handleSearch}
          />

          <span className={styles.borrowBookLimitLabel}>
            已借用書籍 {`${borrowedBooksCount}/${borrowBookLimit}`}
          </span>

          {filteredBooks.length === 0 && (
            <div className={styles.noResults}>沒有相關書籍搜尋結果</div>
          )}

          {filteredBooks.length > 0 && (
            <div>
              <div className={styles.bookContainer}>
                <div className={styles.bookList}>
                  {filteredBooks.map(
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
                          </button>
                          <span className={styles.bookBorrowedTime}>
                            已借用{" "}
                            {formatDuration(moment() - moment(book.status))}
                          </span>
                        </a>
                      )
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
