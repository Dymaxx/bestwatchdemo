// import { Pool } from "pg";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { migrate } from "drizzle-orm/node-postgres/migrator";
// import "dotenv/config";
// import { faker } from "@faker-js/faker";
// import {  movie, actor, user } from "./schema";
// import { log, profile } from "console";

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// const db = drizzle(pool);

// async function main() {
//   console.log("seeding started!");

//   let userId = 0;
//   for (let index = 0; index < 10; index++) {
//     const newUser = await db
//       .insert(user)
//       .values({
//         fullName: faker.person.fullName(),
//         email: faker.internet.email(),
//         role: "user",
//         profilepic: faker.image.avatar(),
//       })
//       .returning();
//     userId = user[0].id;

//     const newActor = await db
//       .insert(actor)
//       .values({
//         name: faker.person.fullName(),
//         gender: "male",
//       })
//       .returning();

//     const movies = await db.insert(movie).values({
//       api_id: faker.number.int({
//         min: 1,
//         max: 1000,
//       }),
//       imdb_id: faker.internet.url(),
//       title: faker.lorem.sentence(),
//       release_date: faker.date.past().getFullYear(),
//       overview: faker.lorem.paragraph(),
//       poster_path: faker.image.avatar(),
//       status: "released",
//       director: faker.person.fullName(),
//       runtime: faker.number.int({
//         min: 60,
//         max: 240,
//       }),
//       budget: faker.number.int({
//         min: 1000000,
//         max: 100000000,
//       }),
//     });
//   }

//   console.log("seeding finished!");

//   console.log("migration ended...");
//   process.exit(0);
// }

// main()
//   .then()
//   .catch((error) => {
//     console.error(error);
//     process.exit(0);
//   });
