import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async(email,verificationToken)=>{
    const recipient = [{email}];
    try{
        const response = await mailtrapClient.send({
            from : sender,
            to:recipient,
            subject : "Verify Your Email",
            html : VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category : "Email Verification",
        });
        console.log("Email Sent Successfully",response);
    }catch(error){
        console.error("Error Sending verification ",error);
        throw new Error(`Error Sending verification Email ,${error}`);
    }
}

export const sendWelcomeEmail = async(email,name)=>{
    const recipient = [{email}];
    try{
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            template_uuid : "ce76d516-871b-415e-aec8-6f6d1258d863",
            template_variables:{
                name : name,
            }, 
        });
        console.log("Welcome Email sent successfully",response);
    }catch(error){
        console.error("Error sending Welcome Email ",error);
        throw new Error(`Error sending Welcome Email ${error}`);
    }
}

export const sendPasswordResetEmail = async(email,resetURL) =>{
    const recipient = [{email}];
    try{
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject : "Reset your password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category:"Password Reset",
        });
    }catch(error){
        console.error("Error sending password reset email",error);
        throw new Error(`Error sending password reset email ${error}`);
    }
}

export const sendResetSuccessEmail = async(email)=>{
    const recipient = [{email}];
    try{
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Password Reset Successfull",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"Password Reset",
        });
    }catch(error){
        console.error("Error sending password reset success email",error);
        throw new Error(`Error sending password reset success email ${error}`);
    }
}