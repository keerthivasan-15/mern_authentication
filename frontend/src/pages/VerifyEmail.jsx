import React, { useState } from "react";
import { Label } from "../components/ui/label.jsx";
import { Input } from "../components/ui/input.jsx";
import { AuthForm } from "./AuthForm";
import { useAuthStore } from "../store/authStore.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



const VerifyEmail = () => {
  const [code,setCode] = useState("");
  const {verifyEmail,error} = useAuthStore();
  const navigate = useNavigate();
  const handleVerifyEmail = async(e) =>{
    e.preventDefault();
    try{
        await verifyEmail(code);
        navigate("/");
        toast.success("Email verified successfully");
    }catch(error){
        console.log("Error :",error);
        toast.error("Error verifying email");
    }
  }
  return (
    <AuthForm title={"Verify Email"} buttonText={"verify email"} handleSubmit={handleVerifyEmail}>
      <div className="flex flex-col space-y-2 w-full mb-4">
        <Label htmlFor="verification_code">Enter the 6 digit code sent to your email</Label>
        <Input id="verification_code" onChange={(e)=>{setCode(e.target.value)}} placeholder="••••••••" type="password" />
    </div>
    {error && <p className="text-red-500">{error}</p>}
    </AuthForm>
  )
}

export default VerifyEmail


