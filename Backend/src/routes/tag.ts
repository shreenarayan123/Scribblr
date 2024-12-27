import { Hono } from "hono";
import { dbInstance } from "../util";
import { verify } from "hono/jwt";

export const tagRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
    Variables: {
      id: string;
    };
  }>(); 

  tagRouter.use("/*", async (c, next) => {
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

  //Get all Tags
tagRouter.get("/all", async (c) => {

    const prisma = dbInstance(c);
  
  
    const tags = await prisma.tag.findMany({});
    console.log(tags, "tags here");
    return c.json(tags);
  });
  
  //Get single Tag
  tagRouter.get("/:id", async(c)=>{
    const prisma = dbInstance(c);
  
    const tagId = c.req.param("id");
    try {
      const newTag = await prisma.tag.findUnique({
        where:{
          id : tagId
        }
      })
      if(!newTag){
        c.status(404)
        return c.json({
          error: "Tag not found",
        })
      }
      return c.json(newTag);
    } catch (error) {
       c.status(500)
     return  c.json({ error: "Internal server error" });
    }
  })