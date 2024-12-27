import { Hono } from "hono";
import { dbInstance } from "../util";
import { verify } from "hono/jwt";


export const followRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
    Variables: {
      id: string;
    };
  }>();

  followRouter.use("/*", async (c, next) => {
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

  //follow A User
followRouter.post('/:id', async(c) =>{
  const {id}  = c.req.param();
  const UserId = id ;
  const body = await c.req.json();
  const prisma = dbInstance(c);
  try {
    const res = await prisma.follower.create({
     data:{
          followerId:UserId,
          followeeId:body.followeeId
      }
    })   
    return c.json(res);
    
  } catch (error) {
    console.log(error)
    c.status(500);
    return c.json({
      message:"Could not follow user"
    });
  }  
})

//Unfollow A User
followRouter.delete('/:id', async(c) =>{
  const {id}  = c.req.param();
  const UserId = id ;
  const body = await c.req.json();
  const prisma = dbInstance(c);
  try {
    const res = await prisma.follower.delete({
     where:{
      followerId_followeeId:{
        followerId:UserId,
        followeeId:body.followeeId
      }
     }
    })   
    return c.json(res);
    
  } catch (error) {
    console.log(error)
    c.status(500);
    return c.json({
      message:"Could not follow user"
    });
  }  
})