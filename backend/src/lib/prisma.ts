import 'dotenv/config.js';
import pg from "pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const pool = new pg.Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  family: 4,
} as pg.PoolConfig & { family: number });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export default prisma;