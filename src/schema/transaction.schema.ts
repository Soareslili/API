import { Transactiontype } from "@prisma/client";
import { ObjectId } from "mongodb";
import { z } from "zod";
import errorMap from "zod/dist/types/v3/locales/en";

const isValidObjectId = (id: string): boolean => ObjectId.isValid(id);

export const createTransaction = z.object({
  description: z.string().min(1, "Descrição obrigatória"),
  amount: z.number().positive("Valor deve ser maior que zero"),
  date: z.coerce.date({
    errorMap: () => ({
      message: "Data inválida, deve ser uma data válida",
    }),
  }),
  categoryId: z.string().refine(isValidObjectId, {
    message: "ID de categoria inválido, deve ser um ObjectId válido",
  }),
  type: z.enum(["expense", "income"], {
    errorMap: () => ({
      message: "Tipo inválido, deve ser 'expense' ou 'income'",
    }),
  }),
});

export const getTransactionsSchema = z.object({
  month: z.string().optional(),
  year: z.string().optional(),
  type: z
    .enum([Transactiontype.expense, Transactiontype.income], {
      errorMap: () => ({ message: "Data inválida" }),
    })
    .optional(),
  categoryId: z
    .string()
    .refine(isValidObjectId, {
      message: "Categoria Inválida",
    })
    .optional(),
});

export const getTransactionsSummarySchema = z.object({
  month: z.string({ message: "O mês é obrigatório" }),
  year: z.string({ message: "O ano é obrigatório" }),
  type: z
    .enum([Transactiontype.expense, Transactiontype.income], {
      errorMap: () => ({ message: "Tipo inválido" }),
    })
    .optional(),
  categoryId: z
    .string()
    .refine(isValidObjectId, {
      message: "Categoria Inválida",
    })
    .optional(),
});

export type getTransactionsQuery = z.infer<typeof getTransactionsSchema>;
export type getTransactionsSummaryQuery = z.infer<typeof getTransactionsSummarySchema>;
