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
  const searchParams = new URL(req.url).searchParams;
  const updatingid = searchParams.get("id") || "";
  const exists = await prisma.expense.findFirst({ where: { id: updatingid } });
  console.log({ updatingid, exists });
  try {
    if (exists) {
      const body = await req.json();
      const updatedExpense = await prisma.expense.update({
        where: { id: updatingid },
        data: {
          title: body.title,
          amount: body.amount,
          category: body.category,
          date: new Date(body.date),
          description: body.description,
          userEmail: body.userEmail,
        },
      });

      return NextResponse.json({
        updatedExpense,
      });
    } else {
      console.log("id not found");
      return NextResponse.json({ error: "id not found" }, { status: 400 });
    }
  } catch (err) {
    console.log(err);
  }
}
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const deletingid = searchParams.get("id") || "";
  const exists = await prisma.expense.findFirst({ where: { id: deletingid } });
  if (!exists) return NextResponse.json({ message: "Expense not found" });
  console.log(deletingid);
  await prisma.expense.delete({ where: { id: deletingid } });
  return NextResponse.json({});
}
