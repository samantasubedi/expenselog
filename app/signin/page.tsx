import { Icon } from "@iconify/react";
import React from "react";
const Signinpage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-600">
      <div className="flex justify-center items-center h-fit bg-neutral-400 w-fit p-5 rounded-2xl flex-col gap-2">
        <span className="text-2xl font-semibold text-blue-900">
          Choose a SignIn method
        </span>
        <div className="flex gap-2 bg-gray-300 p-2 rounded-2xl w-full  border-2 border-transparent hover:border-blue-900 hover:bg-blue-100 cursor-pointer">
          <Icon icon="flat-color-icons:google" width="32" height="32" />
          <span className="text-2xl font-semibold">sign in with google</span>
        </div>

        <div className="flex gap-2 bg-gray-300 p-2 rounded-2xl w-full  border-2 border-transparent hover:border-blue-900 hover:bg-blue-100 cursor-pointer">
          <Icon icon="material-icon-theme:email" width="32" height="32" />
          <span className="text-2xl font-semibold">sign in with Email</span>
        </div>

        <div className="flex gap-2 bg-gray-300 p-2 rounded-2xl w-full border-2 border-transparent hover:border-blue-900 hover:bg-blue-100 cursor-pointer">
          <Icon icon="logos:github-icon" width="32" height="32" />
          <span className="text-2xl font-semibold">sign in with Github</span>
        </div>
        <button className="bg-purple-900 border-2 border-transparent hover:border-white cursor-pointer rounded-2xl p-2 text-xl  text-white">
          Go Back
        </button>
      </div>
    </div>
  );
};
export default Signinpage;
