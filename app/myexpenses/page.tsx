//  THE COMMENTED PART IS HOW WE ACCESS SESSION IN SERVER COMPONENT, IT WAS NOT RELAVENT FOR ME TO MAKE IT SEVER COMPONENT SO I CONVERTED IT TO CLIENT COMPONENT
// import React from "react";
// import { getServerSession } from "next-auth";
// import { authoptions } from "../api/auth/[...nextauth]/route";
// import { GetServerSidePropsContext } from "next";
// import { signOut } from "next-auth/react";

// export async function getserversideprops(context: GetServerSidePropsContext) {
//   // it a special Next.js server-side rendering function that runs on each request to the page.
//   //The context parameter contains info about the incoming HTTP request, like:
//   //  context.req — the Node.js request object
//   // context.res — the Node.js response object
//   // context.params — route parameters
//   const session = await getServerSession(context.req, context.res, authoptions); //in frontend we use useSession() with no parameters because
//   // the browser already knows the current request context (cookies, headers) and useSession handles all that for you.
//   //but On the backend, there is no automatic knowledge of the current HTTP request — you have to explicitly provide the request and response objects
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/signin?error=unauthorized",
//         permanent: false,
//       },
//     };
//   }
// }
"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

import React from "react";
import { useEffect } from "react";

const Expensepage = () => {
  const session = useSession();
  const status = session.status;

  if (session.status === "unauthenticated") {
    setTimeout(() => {
      toast.warn("please signin to continue");
    }, 500);

    return redirect("/");
  }
  const username = session.data?.user?.name;
  const useremail = session.data?.user?.email;
  return (
    <div className="">
      <div>My Expenses</div>
      <div>hello {username} </div>
      <button
        className="bg-red-500 text-white font-bold p-2 rounded-2xl cursor-pointer"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign out
      </button>
    </div>
  );
};
export default Expensepage;
