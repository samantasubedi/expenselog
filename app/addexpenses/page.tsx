"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import Firstform from "@/components/firstform";
import Secondform from "@/components/secondform";
import Thirdform from "@/components/thirdform";
import z, { number } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateExpenseSchema } from "../schema/validationschema";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Addexpensepage = () => {
  const session = useSession();
  if (session.status === "unauthenticated") {
    return redirect("/");
  }
  const [step, setstep] = useState(1);
  const createExpenseForm = useForm({
    resolver: zodResolver(CreateExpenseSchema),
    defaultValues: {
      title: "",
      amount: "",
      date: new Date(),
      category: "",
      description: "",
    },
  });
  const searchparams = useSearchParams();
  const expenseid = searchparams.get("id");

  const query = useQuery({
    queryKey: ["single-expense", expenseid],
    queryFn: async () => {
      const res = await axios.get("/api/user", {
        params: { id: expenseid },
      });
      return res.data;
    },
    enabled: !!expenseid,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      createExpenseForm.reset({
        title: query.data.title,
        amount: query.data.amount,
        date: query.data.date,
        category: query.data.category,
        description: query.data.description ?? "",
      });
    }
  }, [query.isSuccess, query.data]);

  return (
    <div className="mb-[2%]   bg-[url('/addexpensebg.png')] h-full bg-center bg-cover ">
      <div className="text-3xl text-red-950 font-semibold text-center m-[3%]">
        Keep track of where your money goes by logging your expense below.
      </div>
      <div className="flex justify-center">
        <div className="flex   justify-evenly w-[70%]">
          <div className="flex gap-1 flex-col ">
            {step == 1 && (
              <Icon
                icon="mynaui:one"
                className="rounded-full bg-purple-500 text-white text-5xl border-5 border-green-500"
              />
            )}
            {(step == 2 || step == 3) && (
              <Icon
                icon="teenyicons:tick-circle-solid"
                className="text-5xl bg-white rounded-full text-green-500"
              />
            )}
            <div className="font-semibold text-xl text-purple-950">
              Basic Info
            </div>
          </div>

          <div className="flex gap-1 flex-col ">
            {step == 1 && (
              <Icon
                icon="mynaui:two"
                className="rounded-full bg-purple-500 text-white text-5xl border-5 "
              />
            )}

            {step == 2 && (
              <Icon
                icon="mynaui:two"
                className="rounded-full bg-purple-500 text-white text-5xl border-5 border-green-500"
              />
            )}
            {step == 3 && (
              <Icon
                icon="teenyicons:tick-circle-solid"
                className="text-5xl bg-white rounded-full text-green-500"
              />
            )}
            <div className="font-semibold text-xl text-purple-950">
              Date & Type
            </div>
          </div>

          <div className="flex gap-1 flex-col ">
            {(step == 1 || step == 2) && (
              <Icon
                icon="mynaui:three"
                className="rounded-full bg-purple-500 text-white text-5xl border-5"
              />
            )}
            {step == 3 && (
              <Icon
                icon="mynaui:three"
                className="rounded-full bg-purple-500 text-white text-5xl border-5 border-green-500"
              />
            )}
            <div className="font-semibold text-xl text-purple-950 text-center">
              Review
            </div>
          </div>
        </div>
      </div>
      <FormProvider {...createExpenseForm}>
        <div className="flex justify-center items-center mt-[2%]">
          {step == 1 && <Firstform setStep={setstep}></Firstform>}
          {step == 2 && <Secondform setStep={setstep}></Secondform>}
          {step == 3 && <Thirdform setStep={setstep}></Thirdform>}
        </div>
      </FormProvider>
    </div>
  );
};
export default Addexpensepage;
