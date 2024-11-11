// AuthForm.js
import React from "react";
import { cn } from "../lib/utils.jsx";

export function AuthForm({ title, buttonText, handleSubmit, children }) {
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">{title}</h2>
      <form className="my-8" onSubmit={handleSubmit}>
        {children}
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow"
          type="submit"
        >
          {buttonText} &rarr;
        </button>
      </form>
    </div>
  );
}