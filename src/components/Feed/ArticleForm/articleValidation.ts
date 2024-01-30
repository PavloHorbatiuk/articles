import { z } from "zod";

const errorMessages = {
    title: {
        required: "title is required",
        invalid: "Invalid title",
    },
    description: {
        required: "description is required",
        invalid: "Invalid description",
    },
    link: {
        required: "link is required",
        invalid: "link title",
    },
    pubDate: {
        required: "pubDate is required",
        invalid: "Invalid pubDate",
    },
};

export const validationSchema = z.object({
    title: z
        .string()
        .min(1, { message: errorMessages.title.required })
        .optional(),
    description: z
        .string()
        .min(1, { message: errorMessages.title.required })
        .optional(),
    link: z
        .string()
        .min(1, { message: errorMessages.title.required })
        .optional(),
    pubDate: z.date().optional(),
});

export type ArticleFormType = z.infer<typeof validationSchema>;
