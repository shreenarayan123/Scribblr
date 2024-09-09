<a name="readme-top"></a>
<!-- PROJECT SHIELDS -->
<!--
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links

<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="Frontend/src/assets/logo.png" alt="Logo" width="40%">


  <p align="center">
    A Fullstack Modern Blogging web app!
      </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project


A React frontend and Cloudflare workers backend application offering features that replicate Medium, the popular blogging platform. 

Features:
* Token based Authentication.
* Create, Read, Update, Delete Blogs.
* Bookmark, Like, Search, Filter Blogs.
* Autosave blog while writing.
* User profiles.
* Topics.
* Subscribe profiles.
* Comment.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technologies & Libraries

[![React][React.js]][React-url]
[![Cloudflare][CloudflareWorkers]][cloudflare-url]
[![Zod][Zod.js]][zod-url]
[![Typescript][Typescript.js]][typescript-url]
[![Prisma][Prisma]][prisma-url]
[![Postgres][PostgresDB]][postgres-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Project Structure

- Backend: Contains server-side code and logic.
- Common: Shared assets and modules used by frontend and backend. (NPM Library)
- Frontend: Contains client-side code and logic.


## Local Setup

#### Backend

##### Pre-requisities:

- Create a copy of .env.example and name the file `.env`
- Set up Postgres DATABASE_URL in .env file. You can get a free PostgreSQL connection string from [Aiven.io](https://aiven.io/).
- Create a copy of wrangler.sample.toml and name the file `warngler.toml`
- Set up Prisma connection pool DATABASE_URL in wrangler.toml file. You can get this for free from [Prisma](https://www.prisma.io/data-platform/accelerate).
- Set up JWT Secret JWT_SECRET in wrangler.toml file. This can be any value.
- Login to ([cloudflare](https://www.cloudflare.com/)) and create a new R2 bucket. You probably need a Credit card for verfication.
  
```bash 

cd backend
npm install
npm run prisma:migrate
npx prisma generate
npm run dev

```

> Note: wrangler.toml is the environment configuration file for a serverless backend. .env is used by Prisma for connection pooling. Ensure you configure both environment files accordingly.

#### Frontend

- Navigate into the frontend directory using 
```bash

cd frontend
npm install
npm run dev

```

> Note: `frontend/src/config.ts` contains `BACKEND_URL`. If you need your frontend to point to local backend server, uncomment `export const BACKEND_URL = "http://localhost:8787"`. 


#### Running Frontend and Backend Concurrently

To make the developer experience smoother, you can now run both the frontend and backend simultaneously using a single command from the project root.

##### Steps:

- Ensure you have project root folder. install packages with
   ```sh
   npm install
   ```
- Insall both frontend and backend pakages with
   ```sh
   npm install:all
   ```
- Now you can simply run:
   ```sh
   npm run dev
   ```
   This command will start both the frontend and backend servers simultaneously.


[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: [https://www.linkedin.com/in/shreenarayan-jaiswal-092025283/]

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[CloudflareWorkers]: https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white
[cloudflare-url]: https://workers.cloudflare.com/
[Zod.js]: https://img.shields.io/badge/-Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white
[zod-url]: https://zod.dev
[Typescript.js]: https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=for-the-badge
[typescript-url]: https://www.typescriptlang.org/
[Prisma]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[prisma-url]: https://www.prisma.io/
[PostgresDB]: https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white
[postgres-url]: https://www.postgresql.org/



