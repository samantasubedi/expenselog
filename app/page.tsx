"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowBigRight,
  ChartSpline,
  ClipboardCheck,
  UserRoundCheck,
} from "lucide-react";
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

  return (
    <div className="bg-[url('/bgimg.png')] h-full bg-center bg-cover ">
      <div className="flex flex-row justify-between p-5">
        <span className="text-4xl text-blue-700 font-bold">ExpenseLog</span>

        <button
          onClick={() => {
            if (session.status == "authenticated") {
              signOut({ callbackUrl: "/" });
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

      <div className="h-[400px]  flex justify-center mt-[3%] mb-[3%]">
        <div className="bg-slate-200 w-[50%] text-center rounded-2xl p-2">
          Preview video
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
