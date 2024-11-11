// LoginForm.js
import React, { useState } from "react";
import { Label } from "../components/ui/label.jsx";
import { Input } from "../components/ui/input.jsx";
import { AuthForm } from "./AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.jsx";
import toast from "react-hot-toast";

export function LoginPage() {
  const {login,error} = useAuthStore();
  const navigate = useNavigate();
  const [email,Setemail] = useState("");
  const [password,Setpassword] = useState("");
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try{
      await login(email,password);
      console.log("Login successful");
      toast.success("Login successful");
      navigate("/");
    }catch(error){
      console.log("Error :",error);
      toast.error("Error logging in");
    }
  };

  return (
    <AuthForm title="Login" buttonText="Log in" handleSubmit={handleLoginSubmit}>
      <div className="flex flex-col space-y-2 w-full mb-4">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" onChange={(e)=>Setemail(e.target.value)} placeholder="Enter your email" type="email" />
      </div>
      <div className="flex flex-col space-y-2 w-full mb-4">
        <Label htmlFor="password">Password</Label>
        <Input id="password" onChange={(e)=>Setpassword(e.target.value)} placeholder="••••••••" type="password" />
        <Link to="/forgot-password" className="text-sm text-gray-500 hover:underline">Forgot Password?</Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <p className="text-sm text-gray-500 mt-4">Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link></p>
    </AuthForm>
  );
}


