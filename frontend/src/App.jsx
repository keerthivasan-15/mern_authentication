import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import SignupPage from "./pages/SignupPage.jsx"
import {LoginPage} from "./pages/LoginPage.jsx"
import VerifyEmail from "./pages/VerifyEmail.jsx"
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx"
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx"
import { useAuthStore } from "./store/authStore.jsx"
import { useEffect } from "react"
import HomePage from "./pages/HomePage.jsx"

const RedirectAuthenticatedUser = ({children})=>{
  const {isAuthenticated,user} = useAuthStore();
  if(isAuthenticated && user.isVerified){
    return <Navigate to ="/" replace/>
  }
  return children;
}

const ProtectedRoute = ({children})=>{
  const {isAuthenticated,user} = useAuthStore();
  if(!isAuthenticated){
    return <Navigate to ="/login" replace/>
  }
  if(!user.isVerified){
    return <Navigate to = "/verify-email" replace/>
  }
  return children;
}

function App() {
  const {checkAuth} = useAuthStore();
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  return (
    <>
    <Routes>
    <Route path="/" element={<ProtectedRoute>
      <HomePage/></ProtectedRoute>}/>
    <Route path="/signup" element = {
      <RedirectAuthenticatedUser>
        <SignupPage/>
      </RedirectAuthenticatedUser>}/>
    <Route path="/login" element = {
      <RedirectAuthenticatedUser>
      <LoginPage/>
      </RedirectAuthenticatedUser>}/>
    <Route path="/verify-email" element = {<VerifyEmail/>}/>
    <Route path="forgot-password" element = {
      <RedirectAuthenticatedUser>
      <ForgotPasswordPage/>
      </RedirectAuthenticatedUser>}/>
    <Route path="resetPassword/:token" element={
      <RedirectAuthenticatedUser>
      <ResetPasswordPage/>
      </RedirectAuthenticatedUser>
    }/>
    <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
    <Toaster/>
    </>
  )
}

export default App


