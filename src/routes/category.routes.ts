import type { FastifyInstance } from "fastify";
import { getcategories } from "../controller/category.controller";

const categoryRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get("/", getcategories);
};

export default categoryRoutes;
