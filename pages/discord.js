import { useEffect } from "react";
import Router from "next/router";

function DiscordRedirect() {
  useEffect(() => {
    Router.replace("https://discord.gg/qaWtVXq82d");
  }, []);

  return null;
}

DiscordRedirect.getInitialProps = async () => ({
  redirect: {
    destination: "https://discord.gg/qaWtVXq82d",
    permanent: false,
  },
});

export default DiscordRedirect;
