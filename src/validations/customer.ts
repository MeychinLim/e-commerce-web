import { emailRegex, passwordRegex } from "@/lib/regexUtil";
import { z } from "zod";

export const customerRegisterSchema = z
  .object({
    fullName: z.string().min(2, "Required").max(100),
    phone: z.string().min(7, "Required").max(15, "Invalid"),
    email: z
      .string()
      .min(1, "Required")
      .refine((val) => val !== "" && emailRegex, {
        message: "Invalid",
      }),
    address: z.string().min(5, "Required").max(200),
    password: z
      .string()
      .min(1, "Required")
      .regex(passwordRegex, "Password must follow the requirements"),
    confirmPassword: z.string().min(1, "Required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password must match password",
    path: ["confirmPassword"],
  });

export const customerLoginSchema = z.object({
  email: z
    .string()
    .min(1, "Required")
    .refine((val) => val !== "" && emailRegex, {
      message: "Invalid",
    }),
  password: z.string().min(1, "Required"),
});

export const customerVerifySchema = z.object({
  code: z.string().min(1, "Please enter the verification code"),
});

export type CustomerRegisterData = z.infer<typeof customerRegisterSchema>;
export type CustomerLoginData = z.infer<typeof customerLoginSchema>;
export type CustomerVerifyData = z.infer<typeof customerVerifySchema>;
