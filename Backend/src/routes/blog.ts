
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { CreateBlogInput } from "@shreenarayan/medium-zod";
import { dbInstance } from "../util";


export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    id: string;
  };
}>(); 

blogRouter.use("/*", async (c, next) => {
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

// Creating  Blog .....jwtPayload=> UserId
blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = CreateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are incorrect",
    });
  }
  const authorId = c.get("jwtPayload");
  const prisma = dbInstance(c);

  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
        img: body.img || "",
        published: true,
      },
      include:{
        tags: true,
        bookmarks:true,
        claps:true
      }
    });
    const {tags } = body;

    // Upsert tags
    const upsertedTags = await Promise.all(tags.map(async (tag:{topic:string}) => {
      return await prisma.tag.upsert({
        where: { topic: tag.topic },
        update: { topic: tag.topic },
        create: { topic: tag.topic },
      });
    }));

    // Create TagsOnPost relationships
    const tagsOnPostPromises = upsertedTags.map(async (tag) => {
      return await prisma.tagsOnPost.upsert({
        where: {
          tagId_postId: {
            tagId: tag.id,
            postId:blog.id,
          }
        },
        update: {}, // No update needed, as we are just ensuring the relationship exists
        create: {
          tagId: tag.id,
          postId:blog.id,
        }
      });
    });

    await Promise.all(tagsOnPostPromises);


    return c.json({
      blog
    });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.text("internal server error");
  }
});

//Get all blogs
blogRouter.get("/all", async (c) => {
  const prisma = dbInstance(c);
  const blogs = await prisma.post.findMany({
    include: {
      tags: true,
      bookmarks: true,
      claps: true,
    },
  });
  return c.json(blogs);
});

//Get a Blog
blogRouter.get("/:id", async (c) => {
  const { id } = c.req.param();
  const blogId = id;
  const prisma = dbInstance(c);
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: blogId,
      },include:{     
        bookmarks:true,
        tags:true,
        claps:true     
    }
    });
    return c.json(post);
  } catch (error) {
    console.log(error);
    c.status(404);
    return c.text("post not found");
  }
});




//Delete  a Blog 
blogRouter.delete("/:id", async (c) => {
  const { id } = c.req.param();
  const blogId = id;
  const prisma = dbInstance(c);
  try {
    const post = await prisma.post.delete({
      where: {
        id: blogId,
      }
    });
    return c.json({message:"Post deleted successfully"});
  } catch (error) {
    console.log(error);
    c.status(404);
    return c.text("post does not exist");
  }
});


//update a blog

blogRouter.put("/:id", async (c) => {
  try {
    const prisma = dbInstance(c);

    const body = await c.req.json();
    const postId = c.req.param("id");
    const { title, content, tags } = body;

    // Upsert tags
    const upsertedTags = await Promise.all(tags.map(async (tag:{topic:string}) => {
      return await prisma.tag.upsert({
        where: { topic: tag.topic },
        update: { topic: tag.topic },
        create: { topic: tag.topic },
      });
    }));



    

    // Create TagsOnPost relationships
    const tagsOnPostPromises = upsertedTags.map(async (tag) => {
      return await prisma.tagsOnPost.upsert({
        where: {
          tagId_postId: {
            tagId: tag.id,
            postId: postId,
          }
        },
        update: {}, // No update needed, as we are just ensuring the relationship exists
        create: {
          tagId: tag.id,
          postId: postId,
        }
      });
    });

    await Promise.all(tagsOnPostPromises);

    // Update the post with the new tags
    const blog = await prisma.post.update({
      where: { id: postId },
      data: {
        title: title,
        content: content,
      },
      include: { tags: true }, // Optionally include tags in the response
    });

    return c.json({
      blog,
      message: "Post updated successfully",
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.text("Could not update post.");
  }
});



