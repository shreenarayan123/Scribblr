import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";


  export const  dbInstance = (config:any)=>{
  const prisma =   new PrismaClient({
        datasourceUrl: config.env?.DATABASE_URL,
      }).$extends(withAccelerate());
      return prisma
  }