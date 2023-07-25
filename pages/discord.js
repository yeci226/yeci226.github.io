import { useEffect } from "react";
import Router from "next/router";

function DiscordRedirect() {
  useEffect(() => {
    Router.replace("https://discord.gg/ffdnFqBsPV");
  }, []);

  return null;
}

DiscordRedirect.getInitialProps = async () => ({
  redirect: {
    destination: "https://discord.gg/ffdnFqBsPV",
    permanent: false,
  },
});

export default DiscordRedirect;
