import { number, z } from "zod";
export const firstformschema = z.object({
  title: z.string().min(1, "Title is Required !"),
  amount: z
    .number()
    .refine((val) => !Number.isNaN(val), { message: "Amount is required!" })
    .refine((val) => val > 0, { message: "Please enter a valid amount!" }),
});
//refine in Zod is used to add a custom validation rule.
//It takes two arguments:
//A function that returns true (valid) or false (invalid).
//An object with an error message (shown when the function returns false).

export const secondformschema = z.object({
  date: z.date(),
  category: z.string(),
});
export const thirdformschema = z.object({
  description: z.string(),
});
