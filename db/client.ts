import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const drizz = drizzle(pool);

export interface DatabaseUser {
  id: string;
  username: string;
  password: string;
}
