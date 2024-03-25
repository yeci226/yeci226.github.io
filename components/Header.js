import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/nav.module.css";
import { isMobileDevice, LoginClick, LogoutClick } from "../js/cookiesocute";
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

  const handleLogout = () => {
    document.cookie =
      "loggedInUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLoggedInUser(null);
    router.push("/");
  };

  const handleAddClick = () => {
    router.push("/add");
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
