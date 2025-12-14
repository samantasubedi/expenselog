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

      {query.data && query.data.retrivedExpenses.length == 0 && (
        <div
          className="
            flex flex-col items-center justify-center p-8 m-4
            bg-white border-2 border-dashed border-red-300 rounded-3xl
            shadow-xl "
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
                  className="bg-gray-100 rounded-3xl p-5 hover:transform duration-400 ease-in-out hover:bg-blue-100 cursor-pointer"
                >
                  {confirm && (
                    <div className="  fixed inset-0 z-50 flex items-center justify-center   backdrop-blur-xs">
                      <div className=" flex flex-col gap bg-white rounded-3x p-7 w-96 max-w-sm shadow-2xl border-t-4 border-red-500 dark:border-red-600 transform scale-100 animate-fadeIn ">
                        <div className="flex items-center space-x-4">
                          <Icon
                            icon="mingcute:file-warning-fill"
                            width="24"
                            height="24"
                            className="text-red-700"
                          />
                          <div className="font-extrabold text-2xl text-red-700 dark:text-red-500">
                            Irreversible Action!
                          </div>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                          Are you absolutely sure you want to{" "}
                          <b className="text-red-600 font-extrabold">Delete</b>{" "}
                          this expense record? This action cannot be undone.
                        </p>

                        <div className="flex justify-between space-x-4 pt-2">
                          <button
                            className="flex-1 py-3 text-lg rounded-xl font-bold text-white bg-red-600 hover:bg-red-700shadow-md shadow-red-500/50 transition-all transform hover:scale-[1.02] "
                            onClick={() => {
                              deleteMutation.mutate(i.id);
                              setconfirm(false);
                            }}
                          >
                            Yes, Delete It
                          </button>

                          <button
                            className="flex-1 py-3 text-lg rounded-xl font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors "
                            onClick={() => {
                              setconfirm(false);
                            }}
                          >
                            Keep Expense
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* <div>
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
                  </div> */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-500  ">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100 ">
                      <div className="font-extrabold text-3xl text-gray-900 truncate">
                        {i.title}
                      </div>

                      <div className="text-sm font-semibold py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 ">
                        {i.category}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-5 text-sm">
                      <div className="col-span-2 flex justify-between items-end pb-2 border-b border-dashed border-gray-200 dark:border-gray-700">
                        <div className="text-xl font-medium text-gray-600 dark:text-gray-400">
                          Amount
                        </div>
                        <div className="font-extrabold text-4xl text-red-600 dark:text-red-400">
                          Rs.{i.amount}
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <div className="text-xs  text-yellow-700 uppercase font-bold">
                          Date Added
                        </div>
                        <div className="font-semibold text-gray-800 ">
                          {moment(i.date).format("YYYY-MM-DD")}
                        </div>
                      </div>

                      <div className="flex flex-col text-right">
                        <div className="text-xs  text-yellow-700 uppercase font-bold ">
                          Time
                        </div>
                        <div className="font-semibold text-gray-800 dark:text-gray-200">
                          {moment(i.date).format("HH:mm:ss A")}
                        </div>
                      </div>
                    </div>

                    {i.description && (
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-6">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Description
                        </div>
                        <p className="text-sm italic text-gray-700 dark:text-gray-300">
                          {i.description}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => router.push(`/addexpenses?id=${i.id}`)}
                        className="flex items-center gap-1 font-semibold text-sm rounded-full py-2 px-4 text-yellow-800 bg-yellow-100 hover:bg-yellow-200 transition-colors dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800"
                      >
                        <Icon icon="iconamoon:edit-thin" className="text-lg" />
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setconfirm(true);
                        }}
                        className=" flex items-center gap-1 font-semibold text-sm rounded-full py-2 px-4 text-red-700 bg-red-100 hover:bg-red-200 transition-colors dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 "
                      >
                        <Icon icon="ic:baseline-delete" className="text-lg" />
                        Delete
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
