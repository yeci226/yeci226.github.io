import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { DiscordClick } from '../js/cookiesocute';

export default function Header() {
  const router = useRouter();
  const [isOnHomepage, setIsOnHomepage] = useState(true);

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
          <a className="link" href="/about">
            關於AET
          </a>
          <a className="link" href="/about">
            賽制介紹
          </a>
          <a className="link" href="/about">
            比賽直播
          </a>
          <button className={styles.discord_button} onClick={DiscordClick} target="_blank">
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
          cursor: pointer;
        }
        .logo-container.hidden {
          transform: translateX(-150%);
        }
        .text {
          margin-left: 10px;
          font-size: 24px;
          color: #fff;
        }
        .menu {
          display: flex;
        }
        .link-wrapper a {
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
      `}</style>
    </div>
  );
}
