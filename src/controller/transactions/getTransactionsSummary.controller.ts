import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import type { getTransactionsSummaryQuery } from "../../schema/transaction.schema";

dayjs.extend(utc);

export const getTransactionsSummary = async (
  request: FastifyRequest<{ Querystring: getTransactionsSummaryQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const useId = "bsfhjksdji";

  if (!useId) {
    reply.status(401).send({ error: "Usuário não autorizado" });
    return;
  }

  const { month, year } = request.query;

  if (!month || !year) {
    reply.status(400).send({ error: "Mês e Ano são Obrigadatórios" });
    return;
  }

  const starDate = dayjs(`${year}-${month}-01`).startOf("month").toDate();
  const endDate = dayjs(starDate).endOf("month").toDate();

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: useId,
        date: {
          gte: starDate,
          lte: endDate,
        },
      },
      include: {
        category: true,
      },
    });

    reply.send(transactions);
  } catch (err) {
    request.log.error("Error ao trazer transacoes", err);
    reply.status(500).send({ error: "Erro do servidor" });
  }
};
