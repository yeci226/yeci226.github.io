import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/nav.module.css";
import { isMobileDevice } from "../js/cookiesocute";
import accountData from "../public/account.json";

export default function Header() {
  const router = useRouter();
  const [isOnHomepage, setIsOnHomepage] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [logoWidth, setLogoWidth] = useState(250);
  const [logoHeight, setLogoHeight] = useState(110);
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showAddButton, setShowAddButton] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescription] = useState(false);

  const isAdmin =
    loggedInUser &&
    accountData.find((user) => user.username === loggedInUser)?.admin;

  const handleLoginClick = () => {
    router.push("/login");
  };

  useEffect(() => {
    setIsMobile(isMobileDevice());
    setIsOnHomepage(router.pathname === "/");

    if (isMobileDevice()) {
      setLogoWidth(100);
      setLogoHeight(66);
    } else {
      setLogoWidth(120);
      setLogoHeight(90);
    }

    setShowLoginButton(!router.pathname.includes("/login"));
    setShowAddButton(!router.pathname.includes("/login"));

    const cookies = document.cookie.split("; ");
    const loggedInUserCookie = cookies.find((cookie) =>
      cookie.startsWith("loggedInUser=")
    );
    const loggedInUser = loggedInUserCookie
      ? loggedInUserCookie.split("=")[1]
      : null;
    setLoggedInUser(loggedInUser);
  }, [router.pathname, router]);

  const handleAddBook = async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const author = document.getElementById("author")?.value ?? "";
    const image = document.getElementById("image")?.value ?? "";
    console.log(image);
    if (!title) {
      setTitleError(true);
      return;
    } else {
      setTitleError(false);
    }

    if (!description) {
      setDescription(true);
      return;
    } else {
      setDescription(false);
    }

    const response = await fetch(`/api/updateBookStatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book: { title, description, author, image },
        method: "add",
      }),
    });

    if (response.ok) {
      window.alert(`你已成功添加 ${title}`);
      setShowForm(false);
      router.push("/books");
      router.reload();
    } else {
      window.alert("添加書籍失敗");
    }
  };

  const handleLogout = () => {
    document.cookie =
      "loggedInUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLoggedInUser(null);
    router.push("/");
  };

  const handleAddClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div className={styles.header}>
      <div
        className={`${styles.logoContainer} ${
          isOnHomepage ? styles.hidden : ""
        }`}
      >
        <div className={styles.logo}>
          <a href="/">
            <Image src="/icon.png" width={logoWidth} height={logoHeight} />
          </a>
        </div>
      </div>

      {showLoginButton && isAdmin && (
        <button className={styles.addButton} onClick={handleAddClick}>
          添加書籍
        </button>
      )}

      {loggedInUser ? (
        <p className={styles.welcomeMessage} onClick={handleLogout}>
          歡迎 {loggedInUser}
        </p>
      ) : (
        showLoginButton && (
          <nav className={styles.menu}>
            <div className={styles.linkWrapper}>
              <button
                className={styles.login_button}
                onClick={handleLoginClick}
              >
                登入
              </button>
            </div>
          </nav>
        )
      )}

      {showForm && (
        <form className={`${styles.form} ${showForm ? "visible" : ""}`}>
          <h3 className={styles.title}>添加書籍</h3>

          <label className={styles.inputTitle} htmlFor="title">
            書名
          </label>
          <input
            className={`${styles.input} ${titleError ? styles.errorInput : ""}`}
            type="text"
            placeholder="請輸入書名..."
            id="title"
          ></input>
          {titleError && <p className={styles.error}>書名不得為空</p>}
          <label className={styles.inputTitle} htmlFor="description">
            書籍簡介
          </label>
          <div className={styles.passwordContainer}>
            <input
              className={`${styles.input} ${
                descriptionError ? styles.errorInput : ""
              }`}
              type="text"
              placeholder="請輸入書籍簡介"
              id="description"
            ></input>
          </div>
          {descriptionError && <p className={styles.error}>簡介不得為空</p>}
          <label className={styles.inputTitle} htmlFor="author">
            書籍作者
          </label>
          <div className={styles.passwordContainer}>
            <input
              className={`${styles.input} ${
                descriptionError ? styles.errorInput : ""
              }`}
              type="text"
              placeholder="(可選) 請輸入書籍作者"
              id="author"
            ></input>
          </div>
          <label className={styles.inputTitle} htmlFor="image">
            書籍圖片
          </label>
          <div className={styles.passwordContainer}>
            <input
              className={`${styles.input} ${
                descriptionError ? styles.errorInput : ""
              }`}
              type="text"
              placeholder="(可選) 請放入書籍圖片網址"
              id="image"
            ></input>
          </div>
          <button className={styles.button} onClick={handleAddBook}>
            添加
          </button>
          <p className={styles.error}>{error}</p>
        </form>
      )}

      <style jsx>{`
        .header {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0px;
          z-index: 1000;
        }
        .logo-container {
          display: flex;
          align-items: center;
          margin-left: 15px;
          margin-top: 15px;
          transition: transform 0.5s;
        }
        .logo {
          user-select: none;
          cursor: pointer;
        }
        .logo-container.hidden {
          transform: translateX(-150%);
        }
      `}</style>
    </div>
  );
}
