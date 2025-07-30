"use client";
import React from "react";
import { useSession } from "next-auth/react";

const Expensepage = () => {
  const data = useSession();
  console.log(data);
  return (
    <div className="">
      <div>My Expenses</div>
      <div>hello </div>
    </div>
  );
};
export default Expensepage;
