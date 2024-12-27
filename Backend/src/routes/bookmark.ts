import { Hono } from "hono";
import { dbInstance } from "../util";
import { verify } from "hono/jwt";


export const bookmarkRouter =  new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
    Variables: {
      id: string;
    };
  }>();


  bookmarkRouter.use("/*", async (c, next) => {
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


//Bookmark a Blog
bookmarkRouter.post("/:id", async(c)=>{
    const {id}  = c.req.param();
    const prisma = dbInstance(c);
    const body = await c.req.json();
   
    try {
      const bookmarked = await prisma.bookmark.create({
        data:{
          userId:body.userId,
          postId:id
        }
      })
      
      return c.json(bookmarked);
    } catch (error) {
       c.status(500)
     return  c.json({ error: "Internal server error" });
    }
  })


  //UnBookmark a Blog
  bookmarkRouter.delete("/:id", async(c)=>{
    const {id}  = c.req.param();
    const prisma = dbInstance(c);
    const body = await c.req.json();
   
    try {
      const bookmarked = await prisma.bookmark.delete({
        where:{
          userId_postId:{
            userId:body.userId,
            postId:id
          }
        }
      })      
             c.json(bookmarked);
       return c.text("Unbookmarked the blog")
    } catch (error) {
       c.status(500)
     return  c.json({ error: "Internal server error" });
    }
  })

  //Get All bookmarks Related a Post
  bookmarkRouter.get("/:id", async(c)=>{
    const {id}  = c.req.param();
    const prisma = dbInstance(c);
    
    try {
      const bookmarked = await prisma.bookmark.findMany({
        where:{
          
          postId:id
        }
      })
      
      return c.json(bookmarked);
    } catch (error) {
       c.status(500)
     return  c.json({ error: "Internal server error" });
    }
  })