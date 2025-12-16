"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import PreviewCarousel from "@/components/PreviewCarousel";
import {
  ArrowBigRight,
  ChartSpline,
  ClipboardCheck,
  UserRoundCheck,
} from "lucide-react";
import { useState } from "react";
import Navigationbar from "@/components/navigationbar";
export default function Home() {
  const session = useSession();
  const sessionstatus = session.status;

  const Steps = [
    {
      title: "Create Your Account",
      desc: "Sign up in seconds with your Google account",
      icon: UserRoundCheck,
    },
    {
      title: "Log Your Expenses",
      desc: "Quickly add transactions on the go.",
      icon: ClipboardCheck,
    },
    {
      title: "Gain Insights",
      desc: "See clear reports and make informed financial choices.",
      icon: ChartSpline,
    },
  ];

  const router = useRouter();
  function handlesignin() {
    router.push("/signin");
  }
  function handlegetstarted() {
    if (sessionstatus == "authenticated") {
      router.push("/myexpenses");
    } else {
      router.push("/signin");
    }
  }
  const [SignoutConfirm, setSignoutConfirm] = useState(false);

  return (
    <div className="bg-[url('/bgimg.png')] h-full bg-center bg-cover ">
      <div className="sticky top-0 z-50">
        {" "}
        <Navigationbar />
      </div>
      <div className="flex flex-row justify-between p-5">
        <span className="text-4xl text-purple-700 font-bold">ExpenseLog</span>

        <button
          onClick={() => {
            if (session.status == "authenticated") {
              setSignoutConfirm(true);
            } else {
              handlesignin();
            }
          }}
          className={`font-semibold text-white rounded-2xl py-2 px-5 cursor-pointer transition-colors ease-in-out duration-300 ${
            session.status === "authenticated"
              ? "bg-red-700 hover:bg-red-600"
              : "bg-green-600 hover:bg-green-500"
          }`}
        >
          {session.status == "authenticated" ? "Sign Out" : "Sign In"}
        </button>

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
      </div>
      <div className="mt-[5%] flex flex-col gap-10">
        <div className="flex justify-center">
          <p className="font-bold  text-6xl text-center w-[60%] text-teal-800">
            Take Control of Your Money, Track Your Expenses & Live Freely.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className=" text-xl text-teal-900">
            ExpenseLog empowers you to effortlessly track, categorize, and
            understand your
          </p>
          <p className="text-xl text-teal-900">
            spending habits. Make smarter financial decisions, starting today.
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-[5%]">
        <div className="flex gap-5">
          <button
            onClick={() => handlegetstarted()}
            className="font-semibold text-white bg-green-600  rounded-2xl p-2 hover:bg-green-500 transition-colors ease-in-out duration-300 cursor-pointer "
          >
            Get Started - For Free
          </button>
          <button className="font-semibold text-black  bg-gray-300 rounded-2xl p-2 hover:border-black border-2 border-transparent transition-all cursor-pointer ease-in-out duration-300">
            Learn More{" "}
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        {" "}
        <div className="h-[20%] w-[50%]  flex justify-center items-center mt-[3%] mb-[3%]">
          <PreviewCarousel />
        </div>
      </div>
      <div className="grid grid-cols-3 px-5 gap-5">
        {Steps.map((i, index) => {
          return (
            <div key={index} className="flex items-center gap-8">
              <Card className="flex-1 bg-neutral-100">
                <CardContent className="p-3">
                  <div className="flex flex-col gap-3 rounded-2xl">
                    <div className="flex justify-center">
                      <span className="bg-purple-400 p-4 flex items-center justify-center text-center rounded-full  text-2xl font-bold text-white">
                        {<i.icon size={50} />}
                      </span>
                    </div>
                    <div className="flex justify-center">
                      <span className="text-xl font-semibold"> {i.title}</span>
                    </div>
                    <span className=" text-muted-foreground text-center">
                      {i.desc}
                    </span>
                  </div>
                </CardContent>
              </Card>
              {index !== 2 && (
                <ArrowBigRight
                  size={45}
                  className="text-muted-foreground "
                ></ArrowBigRight>
              )}
            </div>
          );
        })}

        {/* <div className="flex flex-col items-center justify-center">
          <Icon icon="teenyicons:arrow-right-solid" className="text-7xl " />
        </div>
        <div className="flex flex-col bg-yellow-100 rounded-2xl p-3 gap-3">
          <div className="flex justify-center">
            <span className="bg-pink-400 size-10 text-center rounded-full p-1 text-2xl font-bold text-white">
              2
            </span>
          </div>
          <div className="flex justify-center">
            <span className="text-xl font-semibold"> Log Your Expenses</span>
          </div>
          <span className="text-xl text-muted-foreground">
            Quickly add transactions on the go.
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Icon icon="teenyicons:arrow-right-solid" className="text-7xl " />
        </div>
        <div className="flex flex-col bg-yellow-100 rounded-2xl p-3 gap-3">
          <div className="flex justify-center">
            <span className="bg-red-400 size-10 text-center rounded-full p-1 text-2xl font-bold text-white">
              3
            </span>
          </div>
          <div className="flex justify-center">
            <span className="text-xl font-semibold"> Gain Insights</span>
          </div>
          <span className="text-xl text-muted-foreground">
            See clear reports and make informed financial choices.
          </span>
        </div> */}
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
