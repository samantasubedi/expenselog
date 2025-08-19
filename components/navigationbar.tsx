"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Navigationbar = () => {
  const router = useRouter();
  const session = useSession();

  const pathname = usePathname();
  const hidenavbar: Boolean = ["/signin"].includes(pathname); //includes is a array method that checkeks if the element exists in the array.
  // usepathmame() gives the current path of the page in which we are in, like /signin if we are in signin page.
  //so "/signin" is stored in pathname if we are in sign in page.
  //hence hidenavbar stored true if we are in signin page
  if (hidenavbar) return null;
  const navlinkclass = (isActive: Boolean) =>
    `${
      isActive ? " underline underline-offset-4 " : ""
    } transition-all duration-300 font-bold text-xl text-purple-900 font-mono`;

  return (
    <div className="flex justify-center z-10 rounded-3xl p-2  border-gray-400 mt-1 bg-gradient-to-r from-neutral-100 to-neutral-300 ">
      <div className="flex w-[50%] justify-evenly ">
        <button
          onClick={() => {
            router.push("/");
          }}
          className={navlinkclass(pathname === "/")}
        >
          Home
        </button>
        <button
          onClick={() => {
            if (session.status == "unauthenticated") {
              toast.warn("please sign in to continue");
            } else {
              router.push("/myexpenses");
            }
          }}
          className={navlinkclass(pathname === "/myexpenses")}
        >
          My Expenses
        </button>
        <button
          onClick={() => {
            if (session.status == "unauthenticated") {
              toast.warn("please sign in to continue");
            } else {
              router.push("/addexpenses");
            }
          }}
          className={navlinkclass(pathname === "/addexpenses")}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default Navigationbar;
