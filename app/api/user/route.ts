import { prisma } from "@/models/expense";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const createdExpense = await prisma.expense.create({
      data: {
        title: body.title,
        amount: body.amount,
        category: body.category,
        date: body.date,
        description: body.description,
        userEmail: body.userEmail,
      },
    });

    return NextResponse.json({
      createdExpense,
    });
  } catch (err) {
    console.log(err);
  }
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const retrivedExpense = await prisma.expense.findMany({
    where: { userEmail: email || "" },
  });
  return NextResponse.json({ retrivedExpense });
}
