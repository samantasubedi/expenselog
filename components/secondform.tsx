import React, { useState } from "react";
import { Icon } from "@iconify/react";

const Secondform = () => {
  const categories = ["Food", "Bills", "Shopping", "Work", "Travel", "Others"];
  const categoryIcons: Record<string, string> = {
    Food: "mdi:food",
    Bills: "mdi:file-document-outline",
    Shopping: "mdi:shopping",
    Work: "mdi:briefcase-outline",
    Travel: "mdi:airplane",
    Others: "mdi:shape-outline",
  };
  const [category, setcategory] = useState("");
  return (
    <div className="bg-gradient-to-r from-neutral-200 to-gray-200 p-5 border-1 shadow-md shadow-gray-500 rounded-2xl w-[40%] hover:shadow-xl transition-all duration-300 ease-in-out hover:shadow-neutral-600">
      <div className="flex flex-col gap-5">
        <div className="text-blue-900 text-center">
          Fill out the details below to track your spendings.
        </div>
        <div className="font-bold text-xl text-center text-blue-950 bg-neutral-300 p-2 rounded-lg">
          Date & Type
        </div>
        <div className="bg-neutral-700 w-full h-[1px]  "></div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Icon icon="uiw:date" className="text-xl text-pink-950" />
            <span className=" font-semibold text-lg text-pink-950">Date</span>
          </div>
          <input
            placeholder="eg. Medical Bills"
            type="date"
            className="text-lg bg-purple-50 rounded-2xl p-2  text-pink-950 transition-all duration-300 ease-in-out hover:border-pink-950 border-transparent  border-2"
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Icon icon="bx:category" className="text-pink-950 text-2xl" />
            <span className=" font-semibold text-lg text-pink-950">
              Category
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 bg-gray-100 p-5 rounded-2xl">
            {categories.map((currentcategory) => (
              <button
                onClick={() => {
                  setcategory(currentcategory);
                }}
                className={` flex gap-2 p-3 rounded-2xl font-semibold  cursor-pointer hover:bg-blue-100 transition-all duration-300 ease-in-out text-pink-950 ${
                  category === currentcategory
                    ? "border-purple-400 border-2 bg-blue-100"
                    : "border-2 border-transparent bg-slate-300"
                }`}
              >
                <Icon
                  icon={categoryIcons[currentcategory]}
                  className="text-xl"
                ></Icon>
                <span> {currentcategory}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button className="cursor-pointer  flex gap-2 bg-gradient-to-r from-gray-100 to-white border-1 hover:border-purple-700 border-transparent shadow-md transition-all duration-300 ease-in-out hover:shadow-purple-900  w-fit p-2 rounded-2xl ">
            <Icon
              icon="ion:play-back-sharp"
              className="text-2xl text-purple-800 "
            />
            <span className="font-bold text-purple-700">Back</span>
          </button>
          <button className="cursor-pointer  flex gap-2  bg-white border-1 hover:border-purple-700 hover:bg-sky-200 border-transparent shadow-md transition-all duration-300 ease-in-out hover:shadow-purple-900  w-fit p-2 rounded-2xl ">
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

export default Secondform;
