import Link from "next/link";
import { Icon } from "@iconify/react";
export default function Home() {
  return (
    <div className="">
      <div className="flex flex-row justify-between p-5">
        <span className="text-4xl text-blue-700 font-bold">ExpenseLog</span>
        <div className="flex gap-4">
          <button className="font-semibold text-white bg-blue-800  rounded-2xl p-2 cursor-pointer hover:bg-blue-600 transition-colors ease-in-out duration-300">
            Sign up
          </button>
          <button className="font-semibold text-white bg-green-600  rounded-2xl p-2 cursor-pointer hover:bg-green-500 transition-colors ease-in-out duration-300">
            Sign In
          </button>
        </div>
      </div>
      <div className="mt-[5%] flex flex-col gap-10">
        <div className="flex justify-center">
          <p className="font-bold  text-6xl text-center w-[60%] ">
            Take Control of Your Money, Track Your Expenses & Live Freely.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className=" text-xl ">
            ExpenseLog empowers you to effortlessly track, categorize, and
            understand your
          </p>
          <p className="text-xl ">
            spending habits. Make smarter financial decisions, starting today.
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-[5%]">
        <div className="flex gap-5">
          <button className="font-semibold text-white bg-green-600  rounded-2xl p-2 hover:bg-green-500 transition-colors ease-in-out duration-300 cursor-pointer ">
            Get Started - For Free
          </button>
          <button className="font-semibold text-black  bg-gray-300 rounded-2xl p-2 hover:border-black border-2 border-transparent transition-all cursor-pointer ease-in-out duration-300">
            Learn More{" "}
          </button>
        </div>
      </div>

      <div className="h-[400px]  flex justify-center mt-[3%] mb-[3%]">
        <div className="bg-blue-100 w-[50%] text-center rounded-2xl p-2">
          Preview video
        </div>
      </div>
      <div className="flex justify-evenly p-5 ">
        <div className="flex bg-yellow-100 flex-col gap-3 rounded-2xl p-3">
          <div className="flex justify-center">
            <span className="bg-purple-400 size-10 text-center rounded-full p-1 text-2xl font-bold">
              1
            </span>
          </div>
          <div className="flex justify-center">
            <span className="text-xl font-semibold"> Create Your Account</span>
          </div>
          <span className="text-xl">
            Sign up in seconds with your Google account.
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Icon icon="teenyicons:arrow-right-solid" className="text-7xl " />
        </div>
        <div className="flex flex-col bg-yellow-100 rounded-2xl p-3 gap-3">
          <div className="flex justify-center">
            <span className="bg-pink-400 size-10 text-center rounded-full p-1 text-2xl font-bold">
              2
            </span>
          </div>
          <div className="flex justify-center">
            <span className="text-xl font-semibold"> Log Your Expenses</span>
          </div>
          <span className="text-xl">Quickly add transactions on the go.</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Icon icon="teenyicons:arrow-right-solid" className="text-7xl " />
        </div>
        <div className="flex flex-col bg-yellow-100 rounded-2xl p-3 gap-3">
          <div className="flex justify-center">
            <span className="bg-red-400 size-10 text-center rounded-full p-1 text-2xl font-bold">
              3
            </span>
          </div>
          <div className="flex justify-center">
            <span className="text-xl font-semibold"> Gain Insights</span>
          </div>
          <span className="text-xl">
            See clear reports and make informed financial choices.
          </span>
        </div>
      </div>
      <footer className="mt-[3%] bg-neutral-200">
        <div className="flex flex-col justify-center items-center gap-3">
          <span className="text-black ">
            &copy;{new Date().getFullYear()} ExpenseLog. All rights reserved.
          </span>
          <a href="" className="hover:underline">
            Privacy Policy
          </a>
          <a href="" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
}
