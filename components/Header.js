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
    </div>
  );
}
