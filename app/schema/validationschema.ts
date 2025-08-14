import { z } from "zod";
export const firstformschema = z.object({
  tilte: z.string().min(1, "Title is Required !"),
  amount: z.number().positive("Amount must be positive"),
});
export const secondformschema = z.object({
  date: z.date(),
  category: z.string(),
});
export const thirdformschema = z.object({
  description: z.string(),
});
