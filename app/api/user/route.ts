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
  const userid = searchParams.get("id");
  console.log(userid);
  if (userid) {
    const updatingExpense = await prisma.expense.findFirst({
      where: { id: userid },
    });

    return NextResponse.json(updatingExpense);
  }

  const retrivedExpenses = await prisma.expense.findMany({
    where: { userEmail: email || "" },
  });
  return NextResponse.json({ retrivedExpenses });
}
export async function PATCH(req: Request, { params }: any) {
  try {
  } catch {}
}
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const deletingid = searchParams.get("id") || "";
  const exists = await prisma.expense.findFirst({ where: { id: deletingid } });
  if (!exists) return NextResponse.json({ message: "Epxnese not found" });
  console.log(deletingid);
  await prisma.expense.delete({ where: { id: deletingid } });
  return NextResponse.json({});
}
