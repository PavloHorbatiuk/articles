import { z } from "zod";

const errorMessages = {
    email: {
        required: "Email is required",
        invalid: "Invalid email",
    },
    password: {
        required: "Password is required",
        weak: "Password must be at least 6 characters",
    },
    name: {
        required: "Name is required",
        invalid: "To short name",
    },
    confirmPassword: {
        required: "Confirm password must be required",
        mismatch: "Your passwords do not match",
    },
};

export const validationSchema = z
    .object({
        name: z
            .string()
            .min(1, { message: errorMessages.name.required })
            .optional(),
        email: z
            .string()
            .min(1, { message: errorMessages.email.required })
            .email({
                message: errorMessages.email.invalid,
            }),
        password: z.string().min(6, { message: errorMessages.password.weak }),
        confirmPassword: z
            .string()
            .min(1, { message: errorMessages.confirmPassword.required })
            .optional(),
        isConfirm: z.boolean(),
    })
    .superRefine((data, ctx) => {
        if (data.isConfirm && data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: errorMessages.confirmPassword.mismatch,
                fatal: true,
                path: ["confirmPassword"],
            });
        }
    });

export type AuthType = z.infer<typeof validationSchema>;
