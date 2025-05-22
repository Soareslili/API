import app from "./app";

import dotenv from "dotenv";
import prisma, { prismaConnect } from "./config/prisma";
import { initializeGlobalCategories } from "./services/globalCategories.service";
dotenv.config();

const port = Number(process.env.PORT);

const starServer = async () => {
  try {
    await prismaConnect();

    await initializeGlobalCategories();

    await app.listen({ port }).then(() => console.log(`Servidor rodando na porta ${port}`));
  } catch (err) {
    console.error(err);
  }
};

starServer();
