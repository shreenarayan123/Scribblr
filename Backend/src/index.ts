
import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors'
import { bookmarkRouter } from './routes/bookmark';
import { tagRouter } from './routes/tag';
import { clapRouter } from './routes/clap';
import { followRouter } from './routes/follow';

// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();

app.use('/api/*', cors())
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);
app.route("/api/v1/bookmark",bookmarkRouter);
app.route("/api/v1/tag",tagRouter);
app.route("/api/v1/clap",clapRouter);
app.route("/api/v1/follow",followRouter);

export default app; 