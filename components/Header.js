import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { DiscordClick } from "../js/cookiesocute";

export default function Header() {
  const router = useRouter();
  const [isOnHomepage, setIsOnHomepage] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    setIsOnHomepage(router.pathname === "/");
  }, [router.pathname]);

  return (
    <div className="header">
      <div className={`logo-container ${isOnHomepage ? "hidden" : ""}`}>
        <div className="logo">
          <a href="/">
            <Image src="/AET2023-1.png" width={250} height={110} />
          </a>
        </div>
      </div>
      <nav className="menu">
        <div className="link-wrapper">
          <div
            className="link dropdown-link"
            onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            <a>賽事資訊</a>
            <ul className={`dropdown ${dropdownVisible ? "visible" : ""}`}>
              <li>
                <a href="/about">關於AET</a>
              </li>
              <li>
                <a href="/rules">賽制介紹</a>
              </li>
              <li>
                <a href="/live">比賽直播</a>
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
          border-radius: 10px;
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
          border-bottom: 3px solid #7289da;
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
          padding: 5px 10px;
          color: #fff;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
