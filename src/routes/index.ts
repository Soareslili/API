import type { FastifyInstance } from "fastify";
import categoryRoutes from "./category.routes";
import transationsRouter from "./transaction.routes";

async function routes(fastify: FastifyInstance): Promise<void> {
  fastify.get("/health", async () => {
    return {
      status: "Ok",
      message: "DevBilss API rodando normalmente",
    };
  });

  fastify.register(categoryRoutes, { prefix: "/categories" });
  fastify.register(transationsRouter, { prefix: "/transactions" });
}

export default routes;
