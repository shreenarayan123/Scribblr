import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { verify } from 'hono/jwt'
import { CreateBlogInput, UpdateBlogInput } from '@shreenarayan/medium-zod';


export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
	Variables:{
		id:string
	}

}>();


blogRouter.use("/*", async (c, next)=>{
	const  authHeader = c.req.header("authorization") || " ";
	const user =  await verify(authHeader, c.env.JWT_SECRET )
	if(user){
		c.set("jwtPayload", user.id);
		await next();
	}else{
		c.status(403);
		 return c.json({
			message:"You are not logged in"
		 })
	}
})


// Creating  Blog .....jwtPayload=> UserId
blogRouter.post('/', async (c) => {
	const body = await c.req.json();
	const {success} = CreateBlogInput.safeParse(body);
  if(!success){
    c.status(411)
    return c.json({
      message:"Inputs are incorrect"
    })
  }
	const authorId = c.get("jwtPayload")
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	try {
		const blog = await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
				authorId :authorId
						
			}
		});
		return c.json({
			id: blog.id
		});
	} catch (error) {
		console.log(error);
		c.status(500);
		return c.text('internal server error')
	}
})



//Get all blogs
blogRouter.get('/all', async (c) => {
	
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());	
	const blogs = await prisma.post.findMany({});
	return c.json({
		blogs
	});
})

//Get a Blog
blogRouter.get('/:id', async (c) => {	
	const { id }  = c.req.param()
	const blogId = id ;
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());	
	try {
		const post = await prisma.post.findUnique({
			where: {
				id:blogId
			}
		});	
		return c.json(post);
	} catch (error) {
		console.log(error);
		c.status(404);
		return c.text('post not found')
	}
})

//update a blog
blogRouter.put('/:id', async (c) => {
	
	const body =  await c.req.json();
	const {success} = UpdateBlogInput.safeParse(body);
  if(!success){
    c.status(411)
    return c.json({
      message:"Inputs are incorrect"
    })
  }
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	try {
		const blog = await prisma.post.update({
			where:{
				id:body.id
			},
			data: {
				title: body.title,
				content: body.content,
				
			}
		});
		return c.json({
			id: blog.id
		});
	} catch (error) {
		console.log(error);
		c.status(500);
		return c.text('could not update post')
	}
})

//delete a blog
blogRouter.delete('/', async (c) => {
	
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    
	
	const body = await c.req.json();
	try {
		const blog = await prisma.post.delete({
			where:{
				id:body.id
			}
		});
		return c.json({
			id: blog.id
		});
	} catch (error) {
		console.log(error);
		c.status(500)
		return c.text('could not delete')
	}
})

