import { ObjectId } from "mongodb";
import { z } from "zod";

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
