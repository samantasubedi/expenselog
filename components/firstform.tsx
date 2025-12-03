import React, { FC } from "react";
import { Icon } from "@iconify/react";
import { z } from "zod";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { T_CreateExpenseType } from "@/app/schema/validationschema";

const Firstform: FC<{
  setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setStep }) => {
  const form = useFormContext<T_CreateExpenseType>();

  return (
    <form
      className="w-[40%]"
      onSubmit={async (e) => {
        e.preventDefault();
        const isValid = await form.trigger(["title", "amount"]);
        if (isValid) {
          setStep(2);
        }
      }}
    >
      <div className="bg-gradient-to-r from-neutral-200 to-gray-200 p-5 border-1 shadow-md shadow-gray-500 rounded-2xl  hover:shadow-xl transition-all duration-300 ease-in-out hover:shadow-neutral-600">
        <div className="flex flex-col gap-5">
          <div className="text-blue-900 text-center">
            Fill out the details below to track your spendings.
          </div>
          <div className="font-bold text-xl text-center text-blue-950 bg-neutral-300 p-2 rounded-lg">
            Basic Information
          </div>
          <div className="bg-neutral-700 w-full h-[1px]  "></div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Icon
                icon="ix:subtitle-filled"
                className="text-2xl text-pink-950"
              />
              <span className=" font-semibold text-lg text-pink-950">
                Expense Title{" "}
              </span>
            </div>
            <input
              {...form.register("title")} // we should register the input field with same name we kept in its schema
              placeholder="eg. Medical Bills"
              type="text"
              className="text-lg bg-purple-50 rounded-2xl p-2  text-pink-950 transition-all duration-300 ease-in-out hover:border-pink-950 border-transparent  border-2"
            ></input>

            {form.formState.errors.title?.message}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Icon
                icon="fa7-solid:sort-amount-up"
                className="text-pink-950 text-xl"
              />
              <span className=" font-semibold text-lg text-pink-950">
                Amount. (Rs)
              </span>
            </div>
            <input
              {...form.register("amount", { valueAsNumber: true })}
              placeholder="0.00 "
              className="text-lg bg-purple-50 rounded-2xl p-2  text-pink-950 transition-all duration-300 ease-in-out hover:border-pink-950 border-transparent  border-2"
            ></input>
            {form.formState.errors.amount?.message}
          </div>
          <div className="flex justify-end">
            <button className="cursor-pointer  flex  bg-white  hover:bg-sky-200  border-1 hover:border-purple-700 border-transparent shadow-md transition-all duration-300 ease-in-out hover:shadow-purple-900  w-fit p-2 rounded-2xl ">
              <span className="font-bold text-purple-700">Next</span>
              <Icon
                icon="carbon:next-filled"
                className="text-2xl text-purple-800"
              />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Firstform;
