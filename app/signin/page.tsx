"use client";
import { Icon } from "@iconify/react";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
const Signinpage = () => {
  const router = useRouter();
  return (
    <div className="h-screen flex justify-center items-center bg-gray-600">
      <div className="flex justify-center items-center h-fit bg-neutral-200 p-5 w-[30%] rounded-2xl flex-col gap-10">
        <span className="text-2xl font-semibold text-blue-900">
          Choose a SignIn method
        </span>
        <div className="transition-all duration-200 ease-in-out flex justify-center gap-2 bg-gray-300 p-2 rounded-2xl w-full  border-2 border-transparent hover:border-blue-900 hover:bg-blue-100 cursor-pointer">
          <Icon icon="flat-color-icons:google" width="32" height="32" />
          <button
            onClick={() => signIn("google", { callbackurl: "/myexpenses" })}
            className="text-2xl font-semibold"
          >
            sign in with google
          </button>
        </div>

        <div className="transition-all duration-200 ease-in-out  flex gap-2 justify-center bg-gray-300 p-2 rounded-2xl w-full  border-2 border-transparent hover:border-blue-900 hover:bg-blue-100 cursor-pointer">
          <Icon icon="material-icon-theme:email" width="32" height="32" />
          <span className="text-2xl font-semibold">sign in with Email</span>
        </div>

        <div className="transition-all duration-200 ease-in-out  flex gap-2 justify-center bg-gray-300 p-2 rounded-2xl w-full border-2 border-transparent hover:border-blue-900 hover:bg-blue-100 cursor-pointer">
          <Icon icon="logos:github-icon" width="32" height="32" />
          <button
            onClick={() => {
              signIn("github", { callbackUrl: "/myexpenses" });
            }}
            className="text-2xl font-semibold"
          >
            sign in with Github
          </button>
        </div>
        <button
          onClick={() => router.push("/")}
          className="bg-purple-600 border-2 border-transparent transition-all duration-200 ease-in-out  hover:border-black cursor-pointer rounded-2xl p-2 text-xl w-full  text-white"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
export default Signinpage;
