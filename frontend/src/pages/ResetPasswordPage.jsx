// SignupForm.js
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Label } from "../components/ui/label.jsx";
import { Input } from "../components/ui/input.jsx";
import { AuthForm } from "./AuthForm";
import { useAuthStore } from "../store/authStore.jsx";
import toast from "react-hot-toast";

function ResetPasswordPage() {
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const {token} = useParams();
  const {resetPassword,error} = useAuthStore();
  const handleResetPassword = async(e) => {
    e.preventDefault();
    if(password != confirmPassword){
        toast.error("Password do not match");
    }
    try{
        await resetPassword(token,password);
        toast.success("Password reset successfully");
        setTimeout(() => {
           navigate("/login"); 
        }, 2000);
    }catch(error){
        console.log("Error :",error);
        toast.error("Error resetting password");
    }
  };

  return (
    <AuthForm title="Reset Password" buttonText="Reset Password" handleSubmit={handleResetPassword}>
      <div className="flex flex-col space-y-2 w-full mb-4">
        <Label htmlFor="password">Password</Label>
        <Input id="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="••••••••" type="password" />
      </div>
      <div className="flex flex-col space-y-2 w-full mb-4">
        <Label htmlFor="confirm_password">Confirm Password</Label>
        <Input id="confirm_password" onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder="••••••••" type="password" />
      </div>
      {error && <p className="text-red-500 font-semibold-mt-2">{error}</p>}
    </AuthForm>
  );
}


export default ResetPasswordPage