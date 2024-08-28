import pg from "pg";
const { Pool } = pg;
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function main() {
  console.log("migration started...");
  await migrate(db, {
    migrationsFolder: "drizzle",
  });
  console.log("migration ended...");
  process.exit(0);
}

main().catch((err) => {
  console.log(err);
  if (err.code === "ECONNREFUSED") {
    console.log("could not connect to db");
  }
  process.exit(0);
});
