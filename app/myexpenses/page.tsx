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
import moment from "moment";

import React from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Expensepage = () => {
  const session = useSession();
  const status = session.status;
  if (session.status === "unauthenticated") {
    return redirect("/");
  }
  const username = session.data?.user?.name;
  const useremail = session.data?.user?.email;
  const query = useQuery({
    queryKey: ["allexpenses"],
    queryFn: async () => {
      const response = await axios.get("/api/user", {
        params: { email: useremail },
      });
      return response.data;
    },
    enabled: !!useremail,
  });
  if (query.isLoading) {
    return <div>loading</div>;
  }
  return (
    <div className="">
      <div>Your All Expenses appears here</div>

      <div className="grid grid-cols-2 gap-4 ">
        {query.data &&
          query.data.retrivedExpense.map(
            (i: {
              title: string;
              date: Date;
              description: string;
              amount: number;
              category: string;
              id: string;
            }) => {
              return (
                <div
                  key={i.id}
                  className="bg-gray-200 rounded-3xl p-5 hover:transform ease-in-out hover:bg-gray-400 cursor-pointer"
                >
                  <div>
                    <div>{moment(i.date).format("YYYY-MM-DD HH:MM:SS A")}</div>
                    <div>{i.title}</div>
                    <div>{i.category}</div>
                    <div>{i.amount}</div>
                    <div>{i.description}</div>
                  </div>
                </div>
              );
            }
          )}
      </div>
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
