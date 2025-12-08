import { number, z } from "zod";

export const CreateExpenseSchema = z.object({
  title: z.string().min(1, "Please enter an title for your expense !"),
  amount: z.coerce
    .number({ message: "Please enter an amount !" })
    .positive("Amount must be positive !"),
  date: z.coerce.date().min(1, "Please enter a date !"),
  category: z.string().min(1, "Please enter a category !"),
  description: z.string(),
});

export type T_CreateExpenseType = z.infer<typeof CreateExpenseSchema>;
