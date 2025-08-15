"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import Firstform from "@/components/firstform";
import Secondform from "@/components/secondform";
import Thirdform from "@/components/thirdform";

const Addexpensepage = () => {
  const session = useSession();
  if (session.status === "unauthenticated") {
    return redirect("/");
  }
  const [step, setstep] = useState(1);
  const [formdata, setformdata] = useState({
    expensetitle: "",
    amount: 0,
    date: "",
    category: "",
    description: "",
  });
  //this is the function that will be passed as prop to each form
  const handlenext = (data: Partial<typeof formdata>) => {
    //here we will obtain a data prameter whose type will be formdata and
    //  the properties form the formdata will be optional as in first form we will only obtain title and date and so on for other forms
    setformdata((prev) => ({ ...formdata, ...data })); //this spreads all previous data and adds new data to it.
    setstep((currentstep) => currentstep + 1); //increasing the step as user presses next
  };
  const handleback = () => {
    setstep((currentstep) => currentstep - 1);
  };
  return (
    <div className="mb-[2%]">
      <div className="text-3xl text-red-950 font-semibold text-center m-[3%]">
        Keep track of where your money goes by logging your expense below.
      </div>
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
      <div className="flex justify-center items-center mt-[2%]">
        {/* <Firstform></Firstform> */}
        {/* <Secondform></Secondform> */}
        {/* <Thirdform></Thirdform> */}
        {step == 1 && <Firstform></Firstform>}
        {step == 2 && <Secondform></Secondform>}
        {step == 3 && <Thirdform></Thirdform>}
      </div>
    </div>
  );
};
export default Addexpensepage;
