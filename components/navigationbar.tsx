"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigationbar = () => {
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
    <div className="flex justify-center z-10 ">
      <div className="flex w-[50%] justify-evenly">
        <Link href="/" className={navlinkclass(pathname === "/")}>
          Home
        </Link>
        <Link
          href="/myexpenses"
          className={navlinkclass(pathname === "/myexpenses")}
        >
          My Expenses
        </Link>
        <Link
          href="addexpenses"
          className={navlinkclass(pathname === "/addexpenses")}
        >
          Add Expense
        </Link>
      </div>
    </div>
  );
};

export default Navigationbar;
