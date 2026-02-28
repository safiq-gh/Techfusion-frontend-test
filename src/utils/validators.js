import { z } from "zod";

export const registrationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .regex(/^[a-zA-Z\s.]+$/, "Name can only contain letters, spaces, and dots"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(150, "Email is too long"),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),

  college: z
    .string()
    .min(3, "College name must be at least 3 characters")
    .max(200, "College name is too long"),

  department: z
    .string()
    .min(2, "Department is required")
    .max(100, "Department name is too long"),

  year: z.enum(["1", "2", "3", "4"], {
    errorMap: () => ({ message: "Please select your year of study" }),
  }),

  category: z.enum(
    ["web", "cyber", "iot", "innovation"],
    { errorMap: () => ({ message: "Please select an event category" }) }
  ),

  transaction_id: z
    .string()
    .min(6, "Transaction ID must be at least 6 characters")
    .max(50, "Transaction ID is too long"),
});

export const statusSchema = z.object({
  registration_id: z
    .string()
    .min(1, "Registration ID is required"),
});