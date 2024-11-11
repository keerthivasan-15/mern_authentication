// SignupForm.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../components/ui/label.jsx";
import { Input } from "../components/ui/input.jsx";
import { AuthForm } from "./AuthForm";
import { useAuthStore } from "../store/authStore.jsx";

export function ForgotPasswordPage() {
  const [email,setEmail] = useState("");
  const navigate = useNavigate();
  const {forgotPassword,error} = useAuthStore();
  const [isSubmitted,setIsSubmitted] = useState(false);
  const handleForgotPassword = async(e) => {
    e.preventDefault();
    try{
        await forgotPassword(email);
        setIsSubmitted(true);
    }catch(error){
        console.log("Error :",error);
    }
  };

  const handleLoginSubmit = (e) => {
    navigate("/login");
  }

  return (
    <div>
    {!isSubmitted ? (
        <AuthForm title="Forgot Password" buttonText="send reset link" handleSubmit={handleForgotPassword}>
      <div className="flex flex-col space-y-2 w-full mb-4">
        <Label htmlFor="email">Enter your email address and we'll send you a link to reset your password</Label>
        <Input id="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your email" type="email" />
      </div>
      {error && <p className="text-red-500 font-semibold-mt-2">{error}</p>}
    </AuthForm>
    ):(
        <AuthForm title="Forgot Password" buttonText="Back to login"handleSubmit={handleLoginSubmit}>
        <div className="flex flex-col space-y-2 w-full mb-4">
          <p className="text-sm text-gray-500 mt-4">If an account exists for {email} you will receive a password link shortly</p>
        </div>
        </AuthForm>
    )}
    </div>
  );
}


export default ForgotPasswordPage;