import { z } from "zod";

export const authorSchema = z.object({
  name: z.string().min(3, { message: "The name must have minimum 3 characters." }),
  description: z.string().min(10, { message: "The description must have minimum 10 characters." }),
  image: z.string().url({ message: "Please enter a valid image URL." }),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Please enter a valid date.",
  }),
});

export type AuthorFormData = z.infer<typeof authorSchema>;