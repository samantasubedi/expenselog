"use client";

import { Icon } from "@iconify/react";
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
      isActive
        ? " bg-gray-200 px-2 py-1 rounded-2xl shadow-sm shadow-gray-500 "
        : "px-2 py-1"
    } transition-all duration-300 font-bold text-xl text-amber-700 font-mono`;

  return (
    <div className="flex justify-center z-10 ">
      <div className="flex w-[50%] justify-evenly ">
        <button
          onClick={() => {
            router.push("/");
          }}
          className={navlinkclass(pathname === "/")}
        >
          <div className="flex gap-2">
            <Icon icon="line-md:home-twotone" width="24" height="24" />
            <div>Home</div>
          </div>
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
          <div className="flex gap-2">
            {" "}
            <Icon icon="hugeicons:file-view" width="24" height="24" />
            <div> My Expenses</div>
          </div>
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
          <div className="flex gap-2">
            <Icon icon="subway:add" width="24" height="24" />
            <div> Add Expense</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navigationbar;
