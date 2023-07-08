import Image from "next/image";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <a href="/">
          <Image src="/logoNText.png" width={128} height={92} />
        </a>
      </div>
      <nav className="menu">
        <div className="link-wrapper">
          <a className="link" href="#about">
            關於AET
          </a>
          <a
            className="link"
            href="https://discord.gg/y3DKVXZxUt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
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
        .logo {
          margin-left: 15px;
          margin-top: 15px;
          cursor: pointer;
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
