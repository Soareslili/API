import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import type { getTransactionsQuery } from "../../schema/transaction.schema";
import type { TransactionFilter } from "../../types/transactions.types";

dayjs.extend(utc);

export const getTransactions = async (
  request: FastifyRequest<{ Querystring: getTransactionsQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = "bsfhjksdji";

  if (!userId) {
    reply.status(401).send({ error: "Usuário não autorizado" });
    return;
  }

  const { month, categoryId, year, type } = request.query;

  const filters: TransactionFilter = { userId };

  if (month && year) {
    const starDate = dayjs(`${year}-${month}-01`).startOf("month").toDate();
    const endDate = dayjs(starDate).endOf("month").toDate();
    filters.date = { gte: starDate, lte: endDate };
  }

  if (type) {
    filters.type = type;
  }

  if (categoryId) {
    filters.categoryId = categoryId;
  }

  try {
    const Transactions = await prisma.transaction.findMany({
      where: filters,
      orderBy: { date: "desc" },
      include: {
        category: {
          select: {
            color: true,
            name: true,
            type: true,
          },
        },
      },
    });

    reply.send(Transactions);
  } catch (err) {
    request.log.error("Error ao trazer transacoes", err);
    reply.status(500).send({ error: "Erro do servidor" });
  }
};
