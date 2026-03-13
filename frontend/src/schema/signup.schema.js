import {z} from "zod";

const passwordValidation = new RegExp(
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
);

export const SignupSchema = z.object({
    firstName: z.string().min(2,{
        message: "First name should have minimum 2 characters"
    }).max(100,{
        message: "First name should have max 100 characters"
    }),

    lastName: z.string().max(100,{
        message: "Last name should have max 100 characters"
    }).optional(),

    email: z.string().email(),

    password: z.string().regex(passwordValidation,{
        message: "Password must include at least one number, one uppercase letter, one lowercase letter, and one special character.",
    }),
});