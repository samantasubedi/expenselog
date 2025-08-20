import React from "react";
import { Icon } from "@iconify/react";
import { firstformschema } from "@/app/schema/validationschema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
type FormDataType = {
  expensetitle: string;
  amount: number;
  date: string;
  category: string;
  description: string;
};
type FirstFormProps = {
  onNext: (data: Partial<FormDataType>) => void;
};
const Firstform = ({ onNext }: FirstFormProps) => {
  type firstformdata = z.infer<typeof firstformschema>; //it extracts the typescript type form zod schema called firstformschema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<firstformdata>({ resolver: zodResolver(firstformschema) }); // useForm() returns a bunch of methods and state for managing your form.
  //and we destructure the returned object to obtain various properties like register, handlesubmit etc.
  //--------register is the Function you use on each input to “register” it with React Hook Form.
  //--------handleSubmit is the Function you wrap your submit handler with.
  //It automatically: Prevents default form submission,Validates the data using Zod,Calls your submit handler with validated data if everything is correct.
  //---------formState is an object that contains the current state of the form, including validation errors.
  //<firstformdata> is a TypeScript generic — it tells React Hook Form the exact shape of your form data, so you get full type safety.
  //The resolver option tells React Hook Form how to validate your form.
  //connects your Zod schema to React Hook Form.
  type firstformtype = z.infer<typeof firstformschema>;
  const submithandler = (data: firstformtype) => {
    onNext(data);
  };
  return (
    <form onSubmit={handleSubmit(submithandler)} className="w-[40%]">
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
              {...register("title")} // we should register the input field with same name we kept in its schema
              placeholder="eg. Medical Bills"
              type="text"
              className="text-lg bg-purple-50 rounded-2xl p-2  text-pink-950 transition-all duration-300 ease-in-out hover:border-pink-950 border-transparent  border-2"
            ></input>
            {errors.title && <p>{errors.title.message}</p>}
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
              {...register("amount", { valueAsNumber: true })}
              placeholder="0.00 "
              className="text-lg bg-purple-50 rounded-2xl p-2  text-pink-950 transition-all duration-300 ease-in-out hover:border-pink-950 border-transparent  border-2"
            ></input>
            {errors.amount && <p>{errors.amount.message}</p>}
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
