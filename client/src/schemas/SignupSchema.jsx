import {z} from "zod"

export const SignupSchema=z.object({
    username: z.string().min(6,"atleast 6 characters").max(30,"username can be upto 30 characters"),
    email: z.string().email({message:"Invalid email address"}),
    password:z.string().min(6,"atleast 6 characters"),
    confirmPassword:z.string().min(6,"atleast 6 characters"),
    pin: z.string().length(6,"Valid 6 digit pin")
}).refine((data)=>data.password===data.confirmPassword,{
    message:"Password do not match",
    path: ["confirmPassword"]
})