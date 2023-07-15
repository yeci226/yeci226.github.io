import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import { useEffect, useState } from 'react';
import { SignUpClick, isMobileDevice } from '../js/cookiesocute';

export default function Home() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  return (
    
    
    <div className={styles.container}>
      
      
      <Head>
        <title>AET 2023</title>
        <link rel="icon" href="/icon.ico" />
      </Head>

      {isMobile ? (
        <div className={styles.mobileBackground} style={{ backgroundImage: 'url(/bg_img.png)' }}/>
      ) : (
        <div style={{ position: "fixed", width: "100%", height: "100%", zIndex: -1 }}>
          <video autoPlay loop muted style={{ width: "100%", height: "100%", objectFit: "cover" }}>
            <source src="/bg.webm" type="video/webm"/>
          </video>
        </div>
      )}

      
      
      <Header />

      <main>

        <div className={styles.logoContainer}>
          <img src="/AET2023-1.png" alt="Logo" className={styles.logo} />
        </div>
        
        <div className={styles.buttonContainer}>
          <button onClick={SignUpClick} className={styles.button}>
            立即報名
          </button>
        </div>
        

      </main>

      <footer>
       
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: #fff;
        }
        .btn:hover {
          color: #212529;
          text-decoration: none;
        }

        .btn:focus,
        .btn.focus {
          outline: 0;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }

        .btn.disabled,
        .btn:disabled {
          opacity: 0.65;
        }

        a.btn.disabled,
        fieldset:disabled a.btn {
          pointer-events: none;
        }

        .btn-dark {
          text-decoration: none;
          color: #fff;
          background-color: #343a40;
          border-color: #343a40;
        }

        .btn-dark:hover {
          color: #fff;
          background-color: #23272b;
          border-color: #1d2124;
        }

        .btn-dark:focus,
        .btn-dark.focus {
          color: #fff;
          background-color: #23272b;
          border-color: #1d2124;
          box-shadow: 0 0 0 0.2rem rgba(82, 88, 93, 0.5);
        }

        .btn-dark.disabled,
        .btn-dark:disabled {
          color: #fff;
          background-color: #343a40;
          border-color: #343a40;
        }

        .btn-dark:not(:disabled):not(.disabled):active,
        .btn-dark:not(:disabled):not(.disabled).active,
        .show > .btn-dark.dropdown-toggle {
          color: #fff;
          background-color: #1d2124;
          border-color: #171a1d;
        }

        .btn-dark:not(:disabled):not(.disabled):active:focus,
        .btn-dark:not(:disabled):not(.disabled).active:focus,
        .show > .btn-dark.dropdown-toggle:focus {
          box-shadow: 0 0 0 0.2rem rgba(82, 88, 93, 0.5);
        }

        .btn-lg,
        .btn-group-lg > .btn {
          padding: 0.75rem 1.25rem;
          font-size: 1.75rem;
          line-height: 1.5;
          border-radius: 0.3rem;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Lilita One, -apple-system, BlinkMacSystemFont, Segoe UI,
            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
          position: relative;
          overflow: hidden;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
