import Head from "next/head";
import styles from "../styles/books.module.css";
import Header from "../components/Header";
import RandomVideo from "../js/randomBg";
import { useEffect, useState } from "react";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const borrowBookLimit = 3;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/book.json");
      const bookData = await response.json();

      setBooks(bookData);
    };

    fetchData();

    const cookies = document.cookie.split("; ");
    const loggedInUserCookie = cookies.find((cookie) =>
      cookie.startsWith("loggedInUser=")
    );
    const loggedInUser = loggedInUserCookie
      ? loggedInUserCookie.split("=")[1]
      : null;
    setLoggedInUsername(loggedInUser);
  }, []);

  const borrowedBooksCount = books.filter(
    (book) => book.borrower === loggedInUsername
  ).length;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = () => {
    setShowAvailableOnly(!showAvailableOnly);
  };

  const filteredBooks = books.filter((book) => {
    const titleMatch = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (filterType === "all") {
      return titleMatch && (!showAvailableOnly || book.status === null);
    } else if (filterType === "available") {
      return titleMatch && book.status === null;
    } else if (filterType === "borrowed") {
      return titleMatch && book.status !== null;
    }
  });

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

        <input
          className={styles.searchBar}
          type="text"
          placeholder="搜尋書籍..."
          value={searchTerm}
          onChange={handleSearch}
        />

        <div className={styles.checkbox}>
          <div className={styles.check}>
            <input
              id="showAvailableOnly"
              type="checkbox"
              checked={showAvailableOnly}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="showAvailableOnly"></label>
          </div>
          <label className={styles.checkboxLabel} htmlFor="showAvailableOnly">
            {showAvailableOnly ? "顯示可借用書籍" : "顯示全部書籍"}
          </label>

          <span className={styles.borrowBookLimitLabel}>
            已借用書籍 {`${borrowedBooksCount}/${borrowBookLimit}`}
          </span>
        </div>

        {filteredBooks.length === 0 && (
          <div className={styles.noResults}>沒有相關書籍搜尋結果</div>
        )}

        <div className={styles.bookContainer}>
          <div className={styles.bookList}>
            {filteredBooks.map((book) => (
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
                  {book.status == null ? (
                    "✔️可借用"
                  ) : (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `❌已被 ${book.borrower} 借用<br>借用時間 ${book.status}`,
                      }}
                    />
                  )}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
