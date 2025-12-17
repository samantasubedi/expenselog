import React, { FC } from "react";
import { Icon } from "@iconify/react";

import { useForm, useFormContext } from "react-hook-form";
import { T_CreateExpenseType } from "@/app/schema/validationschema";
import { z } from "zod";
import { prisma } from "@/models/expense";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Thirdform: FC<{
  setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setStep }) => {
  const form = useFormContext<T_CreateExpenseType>();
  const session = useSession();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const data = form.getValues();

      if (id) {
        const response = await axios.patch("/api/user", {
          ...data,
          userEmail: session.data?.user?.email,
          date: data.date,
        });
      } else {
        const response = await axios.post("/api/user", {
          ...data,
          userEmail: session.data?.user?.email,
          date: data.date,
        });
        return response.data;
      }
    },

    onSuccess: () => {
      toast.success("Expense created Successfully");
      form.reset();
      setStep(1);
    },
    onError: () => {
      toast.error("Cannot add your data");
    },
  });
  const router = useRouter();
  const updateMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.patch("/api/user", form.getValues(), {
        params: { id },
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allexpenses"] });
      toast.success("Expense updated Sucessfully");

      router.push("/myexpenses");
    },
    onError: () => {
      toast.error("Update failed !");
    },
  });

  return (
    <form
      className="w-[40%]"
      onSubmit={async (e) => {
        e.preventDefault();
        const isValid = await form.trigger(["description"]);
        console.log(isValid);
        if (isValid) {
          if (id) {
            updateMutation.mutate(id);
          } else {
            mutation.mutate();
          }
        }
      }}
    >
      {/* <div className="bg-linear-to-r from-neutral-200 to-gray-200 p-5 border shadow-md shadow-gray-500 rounded-2xl  hover:shadow-xl transition-all duration-300 ease-in-out hover:shadow-neutral-600">
        <div className="flex flex-col gap-5">
          <div className="text-blue-900 text-center">
            Fill out the details below to track your spendings.
          </div>
          <div className="font-bold text-xl text-center text-blue-950 bg-neutral-300 p-2 rounded-lg">
            Review
          </div>
          <div className="bg-neutral-700 w-full h-1px  "></div>
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
              {...form.register("description")}
              placeholder=" Write something about your expenses (Optional)"
              type="text"
              className="text-lg bg-purple-50 rounded-2xl p-2  text-pink-950 transition-all duration-300 ease-in-out hover:border-pink-950 border-transparent  border-2"
            ></input>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                setStep(2);
              }}
              className="cursor-pointer  hover:bg-sky-200  flex gap-2 bg-white border hover:border-purple-700 border-transparent shadow-md transition-all duration-300 ease-in-out hover:shadow-purple-900  w-fit p-2 rounded-2xl "
            >
              <Icon
                icon="ion:play-back-sharp"
                className="text-2xl text-purple-800 "
              />
              <span className="font-bold text-purple-700">Back</span>
            </button>

            <button
              disabled={mutation.isPending}
              className="cursor-pointer  flex  bg-white  hover:bg-sky-200  border hover:border-purple-700 border-transparent shadow-md transition-all duration-300 ease-in-out hover:shadow-purple-900  w-fit p-2 rounded-2xl "
            >
              <span className="font-bold text-purple-700">
                {" "}
                {mutation.isPending ? "Creating..." : "Confirm"}{" "}
              </span>
              <Icon
                icon="carbon:next-filled"
                className="text-2xl text-purple-800"
              />
            </button>
          </div>
        </div>
      </div> */}
      {/* Assuming this is wrapped in a similar card structure as Step 1 and 2 */}
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
            <div className="text-2xl font-extrabold text-teal-700">
              Almost Done!
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Add an optional description and confirm your new expense.
            </div>
          </div>

          <div className="flex items-center space-x-3 pb-2 border-b-2 border-indigo-100 dark:border-gray-700">
            <div className="font-bold text-xl text-gray-700 dark:text-gray-200">
              Description (Optional)
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Icon
                icon="streamline-plump:description-solid"
                className="text-xl text-teal-600 dark:text-teal-400"
              />
              <label className="font-semibold text-base text-gray-700 dark:text-gray-300">
                Details
              </label>
            </div>

            <textarea
              {...form.register("description")}
              placeholder="Write something about your expenses (e.g., 'Paid online for emergency dental work')"
              rows={3}
              className="
                    text-base bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-gray-900 dark:text-white
                    border-2 border-gray-200 dark:border-gray-600 focus:border-indigo-500
                    transition-all duration-300 outline-none resize-none
                "
            ></textarea>
          </div>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={() => {
                setStep(2);
              }}
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
              disabled={mutation.isPending}
              type="submit"
              className={`
                    flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg
                    shadow-lg transition-all duration-300
                    ${
                      mutation.isPending
                        ? "bg-indigo-400 text-white cursor-not-allowed shadow-none"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/50 transform hover:scale-[1.02]"
                    }
                `}
            >
              <span className="tracking-wide">
                {mutation.isPending ? "Saving..." : "Confirm & Save"}
              </span>
              <Icon
                icon={
                  mutation.isPending
                    ? "eos-icons:loading"
                    : "carbon:next-filled"
                }
                className="text-2xl"
              />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Thirdform;
