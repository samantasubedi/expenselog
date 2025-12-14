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

import React, { useState } from "react";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  const [confirm, setconfirm] = useState(false);
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

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete("/api/user", {
        params: { id },
      });
      return res;
    },
    onSuccess: () => {
      toast.success("Expense deleted !");
      query.refetch();
    },
    onError: () => {
      toast.error("Deletion failed !");
    },
  });
  const [SignoutConfirm, setSignoutConfirm] = useState(false);

  if (query.isLoading) {
    return (
      <div className="flex justify-center gap-3">
        <div className="text-4xl font-semibold text-amber-700">loading</div>
        <Icon icon="eos-icons:loading" className="text-4xl text-amber-700" />
      </div>
    );
  }
  console.log(query.data);

  return (
    <div className="">
      <div className="flex justify-end-safe">
        <button
          className="bg-red-500 text-white font-bold p-2 rounded-2xl cursor-pointer mr-4"
          onClick={() =>
            //  signOut({ callbackUrl: "/" })
            setSignoutConfirm(true)
          }
        >
          Sign out
        </button>
      </div>

      {SignoutConfirm && (
        <div className=" absolute right-4 top-16 z-50   bg-white dark:bg-gray-800 rounded-xl shadow-2xl transition-all duration-300 p-6 w-72 max-w-xs border border-gray-100 dark:border-gray-700 ">
          <div className="flex items-center space-x-3 mb-4">
            <Icon icon="carbon:logout" width="32" height="32" />
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Confirm Sign Out
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
            You are about to end your session. Are you sure you wish to{" "}
            <b className="text-red-700">logout</b>?
          </p>

          <div className="flex justify-between space-x-3">
            <button
              onClick={() => setSignoutConfirm(false)}
              className="
                    flex-1 py-2 text-sm rounded-lg font-medium
                    text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700
                    hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors
                "
            >
              Stay Logged In
            </button>
            <button
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
              className="
                    flex-1 py-2 text-sm rounded-lg font-semibold
                    text-white bg-red-600 hover:bg-red-700 transition-colors
                    shadow-lg shadow-red-500/50
                "
            >
              Logout Now
            </button>
          </div>
        </div>
      )}

      <div className="text-4xl text-center mt-6 mb-8 text-indigo-600 font-extrabold tracking-tight">
        Your Financial Overview
      </div>

      {query.data.retrivedExpenses.length == 0 && (
        <div
          className="
            flex flex-col items-center justify-center p-8 m-4
            bg-white border-2 border-dashed border-red-300 rounded-3xl
            shadow-xl
        "
        >
          <div className="flex gap-5">
            <Icon
              icon="healthicons:not-ok"
              width="40"
              height="40"
              className="text-red-600 rounded-full"
            />
            <div className="text-3xl font-bold text-red-600 mb-2">
              It's Quiet Here...
            </div>
          </div>
          <p className="text-lg text-gray-500 font-medium">
            No expense records have been added yet! Start tracking your spending
            by adding your expense{" "}
            <button
              onClick={() => router.push("/addexpenses")}
              className="text-semibold text-purple-900 bg-gray-200 rounded-2xl p-2 cursor-pointer"
            >
              Add expense
            </button>
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 m-2">
        {query.data &&
          query.data.retrivedExpenses.map(
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
                  {confirm && (
                    <div className="flex flex-col gap-5 absolute bg-red-100 border-2 rounded-2xl p-3 mt-[5%] ml-[25%]">
                      <div className="font-semibold text-3xl text-red-900">
                        Are you sure you want to delete this expense ?
                      </div>
                      <div className="flex justify-evenly">
                        <button
                          className="bg-red-600 text-lg rounded-2xl p-1 font-bold text-white border-2 border-red-600 hover:border-black cursor-pointer"
                          onClick={() => {
                            deleteMutation.mutate(i.id);
                            setconfirm(false);
                          }}
                        >
                          Delete
                        </button>
                        <button
                          className="bg-blue-900 text-lg rounded-2xl p-1 font-bold text-white border-2 border-blue-900 hover:border-black cursor-pointer"
                          onClick={() => {
                            setconfirm(false);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
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
                      <button
                        onClick={() => {
                          setconfirm(true);
                        }}
                        className="flex flex-row gap-2 font-semibold text-lg text-red-800 bg-red-100 rounded-3xl p-2 cursor-pointer hover:bg-red-200 "
                      >
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
