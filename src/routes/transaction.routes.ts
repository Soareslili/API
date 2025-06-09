import type { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import createTransaction from "../controller/transactions/createTransaction.controller";
import { getTransactions } from "../controller/transactions/getTransactions.controller";
import { getTransactionsSummary } from "../controller/transactions/getTransactionsSummary.controller";
import {
  createTransaction as createTransactionSchema,
  getTransactionsSchema,
  getTransactionsSummarySchema,
} from "../schema/transaction.schema";

const transationsRouter = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: zodToJsonSchema(createTransactionSchema),
    },
    handler: createTransaction,
  });

  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      querystring: zodToJsonSchema(getTransactionsSchema),
    },
    handler: getTransactions,
  });

  fastify.route({
    method: "GET",
    url: "/summary",
    schema: {
      querystring: zodToJsonSchema(getTransactionsSummarySchema),
    },
    handler: getTransactionsSummary,
  });
};

export default transationsRouter;
