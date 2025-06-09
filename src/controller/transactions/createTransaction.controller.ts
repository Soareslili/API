import type { FastifyReply, FastifyRequest } from "fastify";

const createTransaction = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const useId = "bsfhjksdji";

  if (!useId) {
    reply.status(401).send({ error: "Usuário não autorizado" });
    return;
  }

  const { amount, description, type } = request.body as {
    amount: number;
    description: string;
    type: "credit" | "debit";
  };

  if (!amount || !description || !type) {
    reply.status(400).send({ error: "Dados da transação incompletos" });
    return;
  }

  const transaction = {
    id: Math.random().toString(36).substr(2, 9),
    userId: useId,
    amount,
    description,
    type,
    createdAt: new Date().toISOString(),
  };

  reply.status(201).send(transaction);
};

export default createTransaction;
