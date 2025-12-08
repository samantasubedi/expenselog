"use client";
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
import { signOut, useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import moment from "moment";

import React from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const Expensepage = () => {
  const router = useRouter();
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
    return (
      <div className="flex justify-center gap-3">
        <div className="text-4xl font-semibold text-amber-700">loading</div>
        <Icon icon="eos-icons:loading" className="text-4xl text-amber-700" />
      </div>
    );
  }
  // const searchparams=useSearchParams()
  // const editId=searchparams.get("id")
  // const updatequery=useQuery({
  //   queryFn:async()=>{
  //     queryKey:["singleexpense"],
  //     const res = await axios.get(`/api/user? id=${editId}`);
  //     return res.data.expense

  //   },

  // })
  return (
    <div className="">
      <div className="flex justify-end-safe">
        <button
          className="bg-red-500 text-white font-bold p-2 rounded-2xl cursor-pointer mr-4"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign out
        </button>
      </div>
      <div className="text-3xl text-center m-4 text-gray-500 font-semibold">
        Your All Expenses appears here
      </div>

      <div className="grid grid-cols-2 gap-4 m-2">
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
                  className="bg-gray-200 rounded-3xl p-5 hover:transform duration-400 ease-in-out hover:bg-blue-100 cursor-pointer"
                >
                  <div>
                    <div className="font-bold text-3xl text-orange-800 text-center bg-cyan-50 rounded-2xl mb-3">
                      {i.title}
                    </div>
                    <div className="font-semibold text-xl text-red-950">
                      Expense added at :{" "}
                      {moment(i.date).format("YYYY-MM-DD HH:MM:SS A")}
                    </div>
                    <div className="font-semibold text-xl text-red-950">
                      Expense Category : {i.category}
                    </div>
                    <div className="font-semibold text-xl text-red-950">
                      {" "}
                      Expense Amount : {i.amount}
                    </div>
                    {i.description && (
                      <div className="font-semibold text-xl text-red-950">
                        Description : {i.description}
                      </div>
                    )}
                    <div className="flex justify-between mt-5">
                      <button
                        onClick={() => router.push(`/addexpenses?id=${i.id}`)}
                        className="flex flex-row gap-2 font-semibold text-lg text-yellow-900 bg-amber-100 rounded-3xl p-2 cursor-pointer hover:bg-amber-200"
                      >
                        <div>Edit</div>
                        <Icon
                          icon="iconamoon:edit-thin"
                          className="text-2xl text-yellow-900"
                        />
                      </button>
                      <button className="flex flex-row gap-2 font-semibold text-lg text-red-800 bg-red-100 rounded-3xl p-2 cursor-pointer hover:bg-red-200 ">
                        <div>Delete</div>
                        <Icon icon="ic:baseline-delete" className="text-2xl" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};
export default Expensepage;
