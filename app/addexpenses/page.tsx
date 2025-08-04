"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import Firstform from "@/components/firstform";
import Secondform from "@/components/secondform";

const Addexpensepage = () => {
  const session = useSession();
  if (session.status === "unauthenticated") {
    return redirect("/");
  }
  return (
    <div>
      <h1 className="font-semibold text-4xl text-center text-blue-950 mt-[3%] mb-[2%]">
        Add new expense
      </h1>
      <div className="flex justify-center">
        <div className="flex   justify-evenly w-[70%]">
          <div className="flex gap-1 flex-col ">
            <Icon
              icon="mynaui:one"
              className="rounded-full bg-purple-500 text-white text-5xl"
            />
            <div className="font-semibold text-xl text-purple-950">
              Basic Info
            </div>
          </div>

          <div className="flex gap-1 flex-col ">
            <Icon
              icon="mynaui:two"
              className="rounded-full bg-purple-500 text-white text-5xl"
            />
            <div className="font-semibold text-xl text-purple-950">
              Date & Type
            </div>
          </div>

          <div className="flex gap-1 flex-col ">
            <Icon
              icon="mynaui:three"
              className="rounded-full bg-purple-500 text-white text-5xl"
            />
            <div className="font-semibold text-xl text-purple-950 text-center">
              Review
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-[5%]">
        <Firstform></Firstform>
      </div>
    </div>
  );
};
export default Addexpensepage;
