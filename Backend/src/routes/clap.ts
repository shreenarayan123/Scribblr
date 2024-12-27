import { Hono } from "hono";
import { dbInstance } from "../util";
import { verify } from "hono/jwt";


export const clapRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
    Variables: {
      id: string;
    };
  }>(); 

  clapRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || " ";
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set("jwtPayload", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in",
      });
    }
  });
  //Clap a Blog
clapRouter.post("/:id", async(c)=>{
  const {id}  = c.req.param();
  const prisma = dbInstance(c);
  const body = await c.req.json();
 
  try {
    const clapped = await prisma.clap.create({
      data:{
        userId:body.userId,
        postId:id
      }
    })
    
    return c.json(clapped);
  } catch (error) {
     c.status(500)
   return  c.json({ error: "Internal server error" });
  }
})

//Unclap a Blog
clapRouter.delete("/:id", async(c)=>{
  const {id}  = c.req.param();
  const prisma = dbInstance(c); 
  const body = await c.req.json(); 

  const claptoBeDeleted = await prisma.clap.findFirst({
    where:{
      userId:body.userId,
      postId:id
    }
  })
 
  try {
    const clapped = await prisma.clap.delete({
      where: {
       id:claptoBeDeleted?.id
      }
     
    })     
    return  c.json(clapped);
  } catch (error) {
     c.status(500)
   return  c.json({ error: "Internal server error" });
  }
})