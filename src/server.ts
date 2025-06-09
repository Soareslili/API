import app from "./app";
import { env } from "./config/env";

import prisma, { prismaConnect } from "./config/prisma";
import { initializeGlobalCategories } from "./services/globalCategories.service";

const port = env.PORT;

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
