const Footer = () => {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 15,
        textAlign: "center",
        width: "100%",
        color: "#d1d5db",
        fontFamily: "Noto Sans TC, sans-serif",
      }}
    >
      Made by{" "}
      <a
        href="https://github.com/yeci226/"
        style={{
          textDecoration: "none",
          color: "rgba(96, 165, 250, 1)",
          transition: "color 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.color = "rgba(59, 130, 246, 0.5)")}
        onMouseOut={(e) => (e.target.style.color = "rgba(96, 165, 250, 1)")}
      >
        @Yeci
      </a>
    </footer>
  );
};

export default Footer;
