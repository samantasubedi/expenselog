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
          date: new Date(data.date),
        });
      } else {
        const response = await axios.post("/api/user", {
          ...data,
          userEmail: session.data?.user?.email,
          date: new Date(data.date),
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
      form.reset();
      setStep(1);
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
      <div className="bg-linear-to-r from-neutral-200 to-gray-200 p-5 border shadow-md shadow-gray-500 rounded-2xl  hover:shadow-xl transition-all duration-300 ease-in-out hover:shadow-neutral-600">
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
      </div>
    </form>
  );
};

export default Thirdform;
