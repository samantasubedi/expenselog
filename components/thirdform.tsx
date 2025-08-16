import React from "react";
import { Icon } from "@iconify/react";
import { thirdformschema } from "@/app/schema/validationschema";
import { z } from "zod";
const Thirdform = () => {
  type thirdformdata = z.infer<typeof thirdformschema>; //it extracts the typescript type form zod schema called firstformschema
  return (
    <div className="bg-gradient-to-r from-neutral-200 to-gray-200 p-5 border-1 shadow-md shadow-gray-500 rounded-2xl w-[40%] hover:shadow-xl transition-all duration-300 ease-in-out hover:shadow-neutral-600">
      <div className="flex flex-col gap-5">
        <div className="text-blue-900 text-center">
          Fill out the details below to track your spendings.
        </div>
        <div className="font-bold text-xl text-center text-blue-950 bg-neutral-300 p-2 rounded-lg">
          Review
        </div>
        <div className="bg-neutral-700 w-full h-[1px]  "></div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Icon
              icon="streamline-plump:description-solid"
              className="text-2xl text-pink-950"
            />
            <span className=" font-semibold text-lg text-pink-950">
              Description
            </span>
          </div>
          <input
            placeholder=" Write something about your expenses"
            type="text"
            className="text-lg bg-purple-50 rounded-2xl p-2  text-pink-950 transition-all duration-300 ease-in-out hover:border-pink-950 border-transparent  border-2"
          ></input>
        </div>

        <div className="flex justify-between">
          <button className="cursor-pointer  hover:bg-sky-200  flex gap-2 bg-white border-1 hover:border-purple-700 border-transparent shadow-md transition-all duration-300 ease-in-out hover:shadow-purple-900  w-fit p-2 rounded-2xl ">
            <Icon
              icon="ion:play-back-sharp"
              className="text-2xl text-purple-800 "
            />
            <span className="font-bold text-purple-700">Back</span>
          </button>

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
  );
};

export default Thirdform;
