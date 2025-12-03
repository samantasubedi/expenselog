import { PrismaClient } from "@/app/generated/prisma/client";
import { env } from "prisma/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
export const prisma = new PrismaClient({
  adapter,
});
