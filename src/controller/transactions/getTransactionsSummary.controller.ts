import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import type { getTransactionsSummaryQuery } from "../../schema/transaction.schema";
import type { CategorySummary } from "../../types/category.types";
import type { TransactionSummary } from "../../types/transactions.types";

dayjs.extend(utc);

export const getTransactionsSummary = async (
  request: FastifyRequest<{ Querystring: getTransactionsSummaryQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = "bsfhjksdji";

  if (!userId) {
    reply.status(401).send({ error: "Usuário não autorizado" });
    return;
  }

  const { month, year } = request.query;

  if (!month || !year) {
    reply.status(400).send({ error: "Mês e Ano são Obrigadatórios" });
    return;
  }

  const startDate = dayjs(`${year}-${month}-01`).startOf("month").toDate();
  const endDate = dayjs(startDate).endOf("month").toDate();

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        category: true,
      },
    });

    let totalExpenses = 0;
    let totalIncomes = 0;
    const groupedExpenses = new Map<string, CategorySummary>();

    for (const transaction of transactions) {
      if (transaction.type === "expense") {
        if (transaction.categoryId) {
          const existing = groupedExpenses.get(transaction.categoryId) ?? {
            categoryId: transaction.categoryId,
            categoryName: transaction.category?.name || "",
            categoryColor: transaction.category?.color || "",
            amount: 0,
            percentage: 0,
          };

          existing.amount += transaction.amount;
          groupedExpenses.set(transaction.categoryId, existing);
        }
        totalExpenses += transaction.amount;
      } else {
        totalIncomes += transaction.amount;
      }
    }

    // Calcula a porcentagem de cada categoria de despesa
    for (const [, summary] of groupedExpenses) {
      summary.percentage = totalExpenses > 0 ? (summary.amount / totalExpenses) * 100 : 0;
    }

    const summary: TransactionSummary = {
      totalExpenses,
      totalIncomes,
      balance: totalIncomes - totalExpenses,
      expensesByCategory: Array.from(groupedExpenses.values())
        .map((entry) => ({
          ...entry,
          percentage:
            totalExpenses > 0
              ? Number.parseFloat(((entry.amount / totalExpenses) * 100).toFixed(2))
              : 0,
        }))
        .sort((a, b) => b.amount - a.amount),
    };

    reply.send(summary); // ✅ Aqui usamos o objeto corretamente

    reply.send({
      totalExpenses,
      totalIncomes,
      expensesByCategory: Array.from(groupedExpenses.values()),
    });
  } catch (err) {
    request.log.error("Error ao trazer transacoes", err);
    reply.status(500).send({ error: "Erro do servidor" });
  }
};
