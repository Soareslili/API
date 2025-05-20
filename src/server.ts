import app from "./app";

import dotenv from "dotenv";
dotenv.config();

const port = Number(process.env.PORT);

const starServer = async () => {
  try {
    await app.listen({ port }).then(() => console.log(`Servidor rodando na porta ${port}`));
  } catch (err) {
    console.error(err);
  }
};

starServer();
