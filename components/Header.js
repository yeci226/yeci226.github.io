import Image from "next/image";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <a href="/">
          <Image src="/logo.png" width={163} height={73} />
        </a>
      </div>
      <nav className="menu">
        <div className="link-wrapper">
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
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #fff;
          padding: 0px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }
        .logo {
          margin-right: 15px;
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
          color: #000;
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
