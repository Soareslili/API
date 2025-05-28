import type { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import createTransaction from "../controller/transactions/createTransaction.controller";
import { createTransaction as createTransactionSchema } from "../schema/transaction.schema"; // importando schema zod

const transationsRouter = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: zodToJsonSchema(createTransactionSchema),
      response: {
        201: {
          type: "object",
          properties: {
            id: { type: "string" },
            description: { type: "string" },
            amount: { type: "number" },
            type: { type: "string" },
            categoryId: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    handler: createTransaction,
  });
};

export default transationsRouter;
