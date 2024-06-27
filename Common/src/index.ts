import z  from "zod";



export const SignupInput = z.object({
    username:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
})



export const SigninInput = z.object({
    username:z.string().email(),
    password:z.string().min(6)
})




export  const CreateBlogInput = z.object({
    title:z.string(),
    content:z.string(),
    
})



export  const UpdateBlogInput = z.object({
    title:z.string(),
    content:z.string(),
    id:z.string(),
})

//type inference in zod
export type SignupInput = z.infer<typeof SignupInput>
export type SigninInput = z.infer<typeof SigninInput>
export type CreateBlogInput = z.infer<typeof CreateBlogInput>
export type UpdateBlogInput = z.infer<typeof UpdateBlogInput>