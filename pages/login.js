import Head from "next/head";
import styles from "../styles/login.module.css";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isMobileDevice } from "../js/cookiesocute";
import RandomVideo from "../js/randomBg";
import accountData from "../public/account.json";
import EyeIcon from "../components/EyeIcon";
import EyeSlashIcon from "../components/EyeOffIcon";

export default function Login() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSecondFactorVerified, setIsSecondFactorVerified] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (!username) {
      setUsernameError(true);
      return;
    } else {
      setUsernameError(false);
    }

    if (!password) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    const user = accountData.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      if (user.admin) {
        const isSecondFactorVerified = prompt("請輸入第二個密碼");
        if (isSecondFactorVerified === process.env.NEXT_PUBLIC_SECOND_FACTOR) {
          document.cookie = `loggedInUser=${username}; max-age=${
            60 * 60 * 24 * 7 * 4
          }; path=/`;
          setLoggedInUsername(username);
          router.push("/");
        } else {
          setError("還想登admin? 再想想吧。");
        }
      } else {
        document.cookie = `loggedInUser=${username}; max-age=${
          60 * 60 * 24 * 7 * 4
        }; path=/`;
        setLoggedInUsername(username);
        router.push("/");
      }
    } else {
      setError("使用者名稱或密碼錯誤，請重試。");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <RandomVideo />
      <Head>
        <title>土撥鼠圖書館 | 登入</title>
        <link rel="icon" href="/icon.ico" />
        <meta
          name="viewport"
          content="width=device-width,height=device-height,initial-scale=1.0"
        />
      </Head>

      <main>
        <Header loggedInUsername={loggedInUsername} />{" "}
        <form className={styles.form}>
          <h3 className={styles.title}>用刷子洗澡</h3>

          <label className={styles.inputTitle} htmlFor="username">
            使用者名稱
          </label>
          <input
            className={`${styles.input} ${
              usernameError ? styles.errorInput : ""
            }`}
            type="text"
            placeholder="1006..."
            id="username"
          ></input>
          {usernameError && <p className={styles.error}>使用者名稱不能為空</p>}
          <label className={styles.inputTitle} htmlFor="password">
            密碼
          </label>
          <div className={styles.passwordContainer}>
            <input
              className={`${styles.input} ${
                passwordError ? styles.errorInput : ""
              }`}
              type={showPassword ? "text" : "password"}
              placeholder="密碼"
              id="password"
            ></input>
            <button
              className={styles.showPasswordButton}
              type="button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeSlashIcon width={20} height={20} />
              ) : (
                <EyeIcon width={20} height={20} />
              )}
            </button>
          </div>
          {passwordError && <p className={styles.error}>密碼不能為空</p>}
          <button className={styles.button} onClick={handleLogin}>
            登入
          </button>
          <p className={styles.error}>{error}</p>
        </form>
      </main>
    </div>
  );
}
