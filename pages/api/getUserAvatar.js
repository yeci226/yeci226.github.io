import fetch from "node-fetch";

export default async (req, res) => {
  const { id } = req.query;

  const response = await fetch(`https://discord.com/api/users/${id}`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    },
  });

  const data = await response.json();

  res.status(200).json(data);
};
