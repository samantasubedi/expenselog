import { number, z } from "zod";

export const CreateExpenseSchema = z.object({
  title: z.string().min(1, "Title is Required !"),
  amount: z.coerce.number().min(1, "Amount must me nore tna 1"),
  date: z.coerce.date(),
  category: z.string(),
  description: z.string(),
});

export type T_CreateExpenseType = z.infer<typeof CreateExpenseSchema>;
