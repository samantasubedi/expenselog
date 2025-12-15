import React, { FC, useState } from "react";
import { Icon } from "@iconify/react";
import { useForm, useFormContext } from "react-hook-form";
import { T_CreateExpenseType } from "@/app/schema/validationschema";
import { DatePicker } from "./ui/date-picker";

const Secondform: FC<{
  setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setStep }) => {
  const form = useFormContext<T_CreateExpenseType>();

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
    <form
      className="w-[40%]"
      onSubmit={async (e) => {
        e.preventDefault();
        const isValid = await form.trigger(["date", "category"]);
        if (isValid) {
          setStep(3);
        }
      }}
    >
      {/* <div className="bg-linear-to-r from-neutral-200 to-gray-200 p-5 border shadow-md shadow-gray-500 rounded-2xl  hover:shadow-xl transition-all duration-300 ease-in-out hover:shadow-neutral-600">
        <div className="flex flex-col gap-5">
          <div className="text-blue-900 text-center">
            Fill out the details below to track your spendings.
          </div>
          <div className="font-bold text-xl text-center text-blue-950 bg-neutral-300 p-2 rounded-lg">
            Date & Type
          </div>
          <div className="bg-neutral-700 w-full h-px  "></div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Icon icon="uiw:date" className="text-xl text-pink-950" />
              <span className=" font-semibold text-lg text-pink-950">Date</span>
            </div>
            <input
              placeholder="eg. Medical Bills"
              type="date"
              {...form.register("date")}
              className="text-lg bg-purple-50 rounded-2xl p-2  text-pink-950 transition-all duration-300 ease-in-out hover:border-pink-950 border-transparent  border-2"
            ></input>
            <span className="text-red-600">
              {form.formState.errors.date?.message}
            </span>
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
                  type="button"
                  key={currentcategory}
                  onClick={() => {
                    setcategory(currentcategory);
                    form.setValue("category", currentcategory, {
                      shouldValidate: true,
                    });
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
            <span className="text-red-600">
              {form.formState.errors.category?.message}
            </span>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="cursor-pointer  hover:bg-sky-200  flex gap-2 bg-white border hover:border-purple-700 border-transparent shadow-md transition-all duration-300 ease-in-out hover:shadow-purple-900  w-fit p-2 rounded-2xl "
            >
              <Icon
                icon="ion:play-back-sharp"
                className="text-2xl text-purple-800 "
              />
              <span className="font-bold text-purple-700">Back</span>
            </button>
            <button className="cursor-pointer  flex gap-2  bg-white border hover:border-purple-700 hover:bg-sky-200 border-transparent shadow-md transition-all duration-300 ease-in-out hover:shadow-purple-900  w-fit p-2 rounded-2xl ">
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
    bg-white/80 backdrop-blur-md p-8 rounded-3xl /* Glassmorphism effect */
    shadow-2xl shadow-indigo-300/50
    hover:shadow-indigo-400/60 transition-all duration-500
    border-t-2 border-teal-500
"
      >
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <div className="text-2xl font-extrabold text-teal-700 dark:text-indigo-400 mb-1">
              When & What?
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Select the expense date and appropriate category.
            </div>
          </div>

          <div className="flex items-center space-x-3 pb-2 border-b-2 border-indigo-100 dark:border-gray-700">
            <div className="font-bold text-xl text-gray-700 dark:text-gray-200">
              Date & Category
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Icon
                icon="uiw:date"
                className="text-xl text-teal-600 dark:text-teal-400"
              />
              <label className="font-semibold text-base text-gray-700 dark:text-gray-300">
                Date
              </label>
            </div>
            {/* <input
              type="date"
              {...form.register("date")}
              className="
                    text-lg bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-gray-900 dark:text-white
                    border-2 border-gray-200 dark:border-gray-600 focus:border-indigo-500
                    transition-all duration-300 outline-none
                "
            /> */}
            <DatePicker
              value={new Date(form.watch("date"))}
              onChange={(d) => {
                console.log(d);
                form.setValue("date", d);
              }}
              disabled={false}
            />
            <span className="text-red-500 text-sm h-4">
              {form.formState.errors.date?.message}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Icon
                icon="bx:category"
                className="text-xl text-teal-600 dark:text-teal-400"
              />
              <label className="font-semibold text-base text-gray-700 dark:text-gray-300">
                Category
              </label>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-blue-100 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
              {categories.map((currentcategory) => (
                <button
                  type="button"
                  key={currentcategory}
                  onClick={() => {
                    setcategory(currentcategory);
                    form.setValue("category", currentcategory, {
                      shouldValidate: true,
                    });
                  }}
                  className={`
                            flex items-center gap-2 py-3 px-4 rounded-lg font-semibold text-sm
                            cursor-pointer transition-all duration-300 ease-in-out
                            ${
                              category === currentcategory
                                ? "bg-indigo-500 text-white shadow-md shadow-indigo-400/50 transform scale-[1.03]"
                                : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 border border-gray-300 dark:border-gray-600" // Inactive State
                            }
                        `}
                >
                  <Icon
                    icon={categoryIcons[currentcategory]}
                    className="text-xl shrink-0"
                  />
                  <span className="truncate"> {currentcategory}</span>
                </button>
              ))}
            </div>
            <span className="text-red-500 text-sm h-4">
              {form.formState.errors.category?.message}
            </span>
          </div>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="
                    flex items-center gap-2 px-4 py-3 rounded-full
                    bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-lg
                    transition-all duration-300
                    dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-gray-200
                "
            >
              <Icon icon="ion:play-back-sharp" className="text-2xl" />
              Back
            </button>

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

export default Secondform;
