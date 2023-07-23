import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/nav.module.css";
import { DiscordClick } from "../js/cookiesocute";
import { isMobileDevice } from "../js/cookiesocute";

export default function Header() {
  const router = useRouter();
  const [isOnHomepage, setIsOnHomepage] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [logoWidth, setLogoWidth] = useState(250);
  const [logoHeight, setLogoHeight] = useState(110);

  useEffect(() => {
    setIsMobile(isMobileDevice());
    setIsOnHomepage(router.pathname === "/");

    if (isMobileDevice()) {
      setLogoWidth(150);
      setLogoHeight(66);
    } else {
      setLogoWidth(250);
      setLogoHeight(110);
    }
  }, [router.pathname]);
  
  return (
    <div className={styles.header}>
      <div
        className={`${styles.logoContainer} ${
          isOnHomepage ? styles.hidden : ""
        }`}
      >
        <div className={styles.logo}>
          <a href="/">
            <Image src="/AET2023-1.png" width={logoWidth} height={logoHeight} />
          </a>
        </div>
      </div>
      <nav className={styles.menu}>
        <div className={styles.linkWrapper}>
          <div
            className={`${styles.link} ${styles.dropdownLink}`}
            onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            <a>賽事資訊</a>
            <ul
              className={`${styles.dropdown} ${
                dropdownVisible ? styles.visible : ""
              }`}
            >
              <li>
                <a href="/about">關於AET</a>
              </li>
              <li>
                <a href="/rule">賽事說明</a>
              </li>
              <li>
                <a href="/live">比賽直播</a>
              </li>
              <li>
                <a href="/prize">獎品</a>
              </li>
            </ul>
          </div>
          <button className={styles.discord_button} onClick={DiscordClick}>
            Discord
          </button>
        </div>
      </nav>


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
        .text {
          user-select: none;
          margin-left: 10px;
          font-size: 24px;
          color: #fff;
        }
        .menu {
          display: flex;
        }
        .link-wrapper {
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .link-wrapper a {
          white-space: nowrap;
          user-select: none;
          text-decoration: none;
          margin-right: 30px;
          padding: 5px 10px;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          font-size: 24px;
          color: #fff;
        }
        .link-wrapper a::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 100%;
          border-bottom: 3px solid #47ee9e;
          transition: right 0.2s;
        }
        .link-wrapper a:hover::after {
          right: 0;
        }
        .dropdown-link {
          position: relative;
        }
        .dropdown {
          white-space: nowrap;
          max-height: 0;
          overflow: hidden;
          position: absolute;
          list-style-type: none;
          padding: 0 0;
          transition: max-height 0.5s ease, padding 0.5s ease;
        }
        .dropdown.visible {
          max-height: 200px;
          padding: 15px 0;
        }
        .dropdown li a {
          white-space: nowrap;
          display: block;
          padding: 10px 10px;
          color: #9db2bf;
          text-decoration: none;
        }
      `}</style>
      
      
</div> 
)}