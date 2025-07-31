"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const Addexpensepage = () => {
  const session = useSession();
  if (session.status === "unauthenticated") {
    toast.warn("please signin to continue");
    return redirect("/");
  }
  return <div className="text-8xl">add expense page</div>;
};
export default Addexpensepage;
