import { z } from "zod";

export const SignupSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email().min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm password is required')
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match'
});
export type ISignupFormData = z.infer<typeof SignupSchema>;