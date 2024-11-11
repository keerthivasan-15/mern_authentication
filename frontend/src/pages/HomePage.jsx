import React from 'react'
"use client";
import { cn } from "../lib/utils";
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';


const HomePage = () => {
    const {user,logout} = useAuthStore();
    const handleLogout = () =>{
        logout();
        toast.success("Logged out successfully");
    };
    return (
        <div className="max-w-xs w-full group/card">
          <div
            className={cn(
              " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
              "bg-[url(https://images.unsplash.com/photo-1730401723426-5ef4de56df92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMTh8fHxlbnwwfHx8fHw%3D)] bg-cover"
            )}
          >
            <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
            <div className="flex flex-row items-center space-x-4 z-10">
              <div className="flex flex-col">
                <p className="font-normal text-base text-gray-50 relative z-10">
                  {user.name}
                </p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
            <div className="text content">
              <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
                Login Details
              </h1>
              <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
                {user.lastLogin }
              </p>
            </div>
          </div>
          <button onClick={handleLogout}
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow"
          type="submit"
        >
          Logout &rarr;
        </button>
        </div>
        
      );
    }

export default HomePage


