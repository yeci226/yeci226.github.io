export async function getServerSideProps() {
  return {
    redirect: {
      destination: "https://discord.gg/qaWtVXq82d",
      permanent: false,
    },
  };
}

export default function DiscordRedirect() {
  return null;
}
