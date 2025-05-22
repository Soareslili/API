import { type Category, Transactiontype } from "@prisma/client";
import prisma from "../config/prisma";

type GlobalCategoryInput = Pick<Category, "name" | "color" | "type">;

const globalCategories: GlobalCategoryInput[] = [
  { name: "Alimentação", color: "#FF5733", type: Transactiontype.expense },
  { name: "Transporte", color: "#33FF57", type: Transactiontype.expense },
  { name: "Moradia", color: "#3357FF", type: Transactiontype.expense },
  { name: "Saúde", color: "#FF33A1", type: Transactiontype.expense },
  { name: "Educação", color: "#FF33FF", type: Transactiontype.expense },
  { name: "Lazer", color: "#ffba33", type: Transactiontype.expense },
  { name: "Compras", color: "#33fff6", type: Transactiontype.expense },
  { name: "Outros", color: "#B033FF", type: Transactiontype.expense },

  // Receitas

  { name: "Salário", color: "#33FF57", type: Transactiontype.income },
  { name: "Freelance", color: "#3357FF", type: Transactiontype.income },
  { name: "Investimentos", color: "#FF33A1", type: Transactiontype.income },
  { name: "Outros", color: "#FF33FF", type: Transactiontype.income },
];

export const initializeGlobalCategories = async (): Promise<Category[]> => {
  const createdCategories: Category[] = [];

  for (const category of globalCategories) {
    try {
      const existing = await prisma.category.findFirst({
        where: {
          name: category.name,
          type: category.type,
        },
      });

      if (!existing) {
        const newCategory = await prisma.category.create({
          data: category,
        });
        console.log(`✅ Categoria criada: ${newCategory.name}`);
        createdCategories.push(newCategory);
      } else {
        createdCategories.push(existing);
      }
    } catch (err) {
      console.error(`❌ Erro ao criar categoria: ${category.name}`, err);
    }

    console.log(`Categoria ${category.name} já existe.`);
  }

  return createdCategories;
};
