// SignupForm.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../components/ui/label.jsx";
import { Input } from "../components/ui/input.jsx";
import { AuthForm } from "./AuthForm";
import { useAuthStore } from "../store/authStore.jsx";
import toast from "react-hot-toast";

function SignupPage() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const {signup,error} = useAuthStore();
  const handleSignupSubmit = async(e) => {
    e.preventDefault();
    try{
      await signup(email,name,password);
      toast.success("Account created successfully");
      navigate("/verify-email");
    }catch(error){
      console.log("Error :",error);
      toast.error("Error signing up");
    }
  };

  return (
    <AuthForm title="Sign Up" buttonText="Sign up" handleSubmit={handleSignupSubmit}>
      <div className="flex flex-col space-y-2 w-full mb-4">
        <Label htmlFor="name">Name</Label>
        <Input id="name" onChange={(e)=>{setName(e.target.value)}}placeholder="Enter your name" type="text" />
      </div>
      <div className="flex flex-col space-y-2 w-full mb-4">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your email" type="email" />
      </div>
      <div className="flex flex-col space-y-2 w-full mb-4">
        <Label htmlFor="password">Password</Label>
        <Input id="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="••••••••" type="password" />
      </div>
      <p className="text-sm text-gray-500 mt-4">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link></p>
      {error && <p className="text-red-500 font-semibold-mt-2">{error}</p>}
    </AuthForm>
  );
}


export default SignupPage;