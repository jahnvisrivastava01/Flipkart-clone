import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Product title must be at least 2 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),

  brand: z
    .string()
    .trim()
    .optional(),

  category: z
    .string()
    .trim()
    .min(1, "Category is required"),

  price: z
    .number()
    .positive("Price must be greater than 0"),

  mrp: z
    .number()
    .positive("MRP must be greater than 0"),

  discountPercent: z
    .number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100")
    .optional(),

  images: z
    .array(z.string().url("Each image must be a valid URL"))
    .optional(),

  stock: z
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .optional(),

  highlights: z
    .array(z.string())
    .optional(),

  specifications: z
    .record(z.string(), z.string())
    .optional(),
});

export const reviewSchema = z.object({
  rating: z
    .number()
    .int("Rating must be a whole number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),

  comment: z
    .string()
    .trim()
    .min(1, "Comment is required"),
});