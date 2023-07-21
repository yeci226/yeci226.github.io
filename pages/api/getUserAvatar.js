import fetch from "node-fetch";

export default async (req, res) => {
  const { id } = req.query;

  const response = await fetch(`https://discord.com/api/users/${id}`, {
    headers: {
      Authorization: `Bot MTAwNjc0NzM3MDA2MDUzMzc2MA.GMM1CP.-xTq2tMoSx2E9iaPgA6eUv-Be5mb57hxrPC4Oo`,
    },
  });

  const data = await response.json();

  res.status(200).json(data);
};
