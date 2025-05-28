import type { FastifyReply, FastifyRequest } from "fastify";

const createTransaction = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const useId = "bsfhjksdji";

  if (!useId) {
    reply.status(401).send({ error: "Usuário não autorizado" });
    return;
  }
};

export default createTransaction;
