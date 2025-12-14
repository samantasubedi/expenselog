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
      {/* <div className="bg-linear-to-r from-neutral-200 to-gray-200 p-5 border shadow-md shadow-gray-500 rounded-2xl  hover:shadow-xl transition-all duration-300 ease-in-out hover:shadow-neutral-600">
        <div className="flex flex-col gap-5">
          <div className="text-blue-900 text-center">
            Fill out the details below to track your spendings.
          </div>
          <div className="font-bold text-xl text-center text-blue-950 bg-neutral-300 p-2 rounded-lg">
            Basic Information
          </div>
          <div className="bg-neutral-700 w-full h-1px  "></div>
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

            <span className="text-red-600">
              {form.formState.errors.title?.message}
            </span>
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
              type="number"
              {...form.register("amount", { valueAsNumber: true })}
              placeholder="0.00 "
              className="text-lg bg-purple-50 rounded-2xl p-2  text-pink-950 transition-all duration-300 ease-in-out hover:border-pink-950 border-transparent  border-2"
            ></input>
            <span className="text-red-600">
              {form.formState.errors.amount?.message}
            </span>
          </div>
          <div className="flex justify-end">
            <button className="cursor-pointer  flex  bg-white  hover:bg-sky-200  border hover:border-purple-700 border-transparent shadow-md transition-all duration-300 ease-in-out hover:shadow-purple-900  w-fit p-2 rounded-2xl ">
              <span className="font-bold text-purple-700">Next</span>
              <Icon
                icon="carbon:next-filled"
                className="text-2xl text-purple-800"
              />
            </button>
          </div>
        </div>
      </div> */}
      <div
        className="
    bg-white/80 backdrop-blur-md p-8 rounded-3xl
    shadow-2xl shadow-indigo-300/50
    hover:shadow-indigo-400/60 transition-all duration-500
   border-teal-500  border-t-2 
"
      >
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <div className="text-2xl font-extrabold text-teal-700">
              Start Tracking
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Fill out the basic details below to record your spending.
            </div>
          </div>

          <div className="flex items-center space-x-3 pb-2 border-b-2 border-indigo-100 dark:border-gray-700">
            <div className="font-bold text-xl text-gray-700 dark:text-gray-200">
              Basic Information
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Icon
                icon="ix:subtitle-filled"
                className="text-xl text-teal-600 dark:text-teal-400"
              />
              <label className="font-semibold text-base text-gray-700 dark:text-gray-300">
                Expense Title <span className="text-red-500">*</span>
              </label>
            </div>
            <input
              {...form.register("title")}
              placeholder="e.g., Medical Bills, Groceries, Rent"
              type="text"
              className="
                    text-lg bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-gray-900 dark:text-white
                    border-2 border-gray-200 dark:border-gray-600 focus:border-indigo-500
                    transition-all duration-300 outline-none
                "
            />
            <span className="text-red-500 text-sm h-4">
              {form.formState.errors.title?.message}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Icon
                icon="fa7-solid:sort-amount-up"
                className="text-xl text-teal-600 dark:text-teal-400"
              />
              <label className="font-semibold text-base text-gray-700 dark:text-gray-300">
                Amount (Rs) <span className="text-red-500">*</span>
              </label>
            </div>
            <input
              type="number"
              {...form.register("amount", { valueAsNumber: true })}
              placeholder="0.00"
              className="
                    text-lg bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-gray-900 dark:text-white
                    border-2 border-gray-200 dark:border-gray-600 focus:border-indigo-500
                    transition-all duration-300 outline-none
                "
            />
            <span className="text-red-500 text-sm h-4">
              {form.formState.errors.amount?.message}
            </span>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="
                    flex items-center gap-2 px-6 py-3 rounded-full
                    bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg
                    shadow-lg shadow-indigo-500/50 transition-all duration-300
                    transform hover:scale-[1.02]
                "
            >
              Next
              <Icon icon="carbon:next-filled" className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Firstform;
