
import { Hono } from 'hono';
import { sign } from 'hono/jwt'
import { SignupInput , SigninInput} from '@shreenarayan/medium-zod';
import { dbInstance} from '../util';
 
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    id: string;
  };
}>();



//SignUp
userRouter.post('/signup', async (c) => {
	const prisma = dbInstance(c);

	const body = await c.req.json();
  const success  = SignupInput.safeParse(body);
  if(!success){
    c.status(411)
    return c.json({
      message:"Inputs are incorrect"
    })
  }
  const NewUser = await prisma.user.findFirst({
    where :{
      email:body.username,
      password:body.password
    }
  })
  if(!NewUser){
	try {
		const user = await prisma.user.create({
			data: {
        name:body.name,
				email: body.username,
				password: body.password,
        

			}
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt ,user });
	} catch(e) {
		c.status(403);
		return c.json({ message: "error while signing up" });
	}
  
}else{
  c.status(403)
  return c.json({
    message:"Email or username already taken"
  })
}
})

//SignIn 
userRouter.post('/signin', async (c)=>{
  const prisma = dbInstance(c);
  
  const body = await c.req.json();
  const {success} = SigninInput.safeParse(body);
  if(!success){
    c.status(411)
    return c.json({
      message:"Inputs are incorrect"
    })
  }

  
    
      try{
        const user = await prisma.user.findFirst({
          where :{
            email:body.username,
            password:body.password
          }
        })
    
        if(!user){
          c.status(403);
          return c.json({message:"User does not exist"})
        }
        const jwt = await sign({id:user.id}, c.env.JWT_SECRET)
        return c.json({ jwt ,user });
      }catch(e){
        c.status(411);
        return c.json({message:'error while signing in '})
    
      } 
})

//Get All Users
userRouter.get('/all', async (c) => {
  
  const prisma = dbInstance(c);	
  const users = await prisma.user.findMany({});
  return c.json({
    users
  });
})


//Get Single User
userRouter.get('/:id', async (c) => {
  
  const prisma = dbInstance(c);	
  try {
    const user = await prisma.user.findUnique({
      where: {
        id:c.req.param("id"), // Assuming id is a number; adjust accordingly
      },
      include: {
        posts: { // Include posts and related entities inside posts
          include: {
            bookmarks: true,
            claps: true,
            tags: true,
          },
        },
        claps: true,
        bookmarks: true,
        followers: true,
        following: true,
      },
    });
    
    if(!user){
      c.status(404);
      return c.json({message:"User not found"})
    }else{
      return c.json(user);
    }

  } catch (error) {
    return c.json({message:"Internal Server Error"})
  }
})


//Update A User
userRouter.put('/:id', async(c) =>{
  const {id}  = c.req.param();
  const UserId = id ;
  const body = await c.req.json();
  const prisma = dbInstance(c);
  try {
    const res = await prisma.user.update({
      where:{
        id : UserId
      },
      data:{
        name:body.name,
        bio:body.bio,
        img:body.img,
  
      }
    })
   
    return c.json(res);
    
  } catch (error) {
    c.status(500);
    return c.json({
      message:"Could not update user"
    });
  }

  
})


