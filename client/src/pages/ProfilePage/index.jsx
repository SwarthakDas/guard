import { Check, Shield } from "lucide-react"
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const ProfilePage = () => {
  const navigate=useNavigate()
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [updatePassword,setUpdatePassword]=useState(false)
  const [showUpdated,setShowUpdated]=useState(false)

  const schema = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

  const{
      register,
      handleSubmit,
      formState:{errors},
      reset
    }=useForm({
      resolver: zodResolver(schema),
    })


  useEffect(()=>{
    const getDetails=async ()=>{
        try {
          const response=await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/auth/details`,
              {
                method:"GET",
                headers:{"Content-Type": "application/json"},
                credentials: "include"
              }
          )
          const result=await response.json()
          
          if (!result.success)throw new Error("Login failed");
          setUsername(result.data.username)
          setEmail(result.data.email)
        } catch (error) {
          console.error(error.message);
          alert(error.message); 
        }
      }
      getDetails()
    }, []);
  
  const homeNavigate=()=>{navigate("/")}

  const onSubmit=async(data)=>{
    try {
          delete data.confirmPassword
          const response=await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/auth/update-password`,
            {
              method:"POST",
              headers:{"Content-Type": "application/json"},
              credentials: "include",
              body: JSON.stringify(data)
            }
          )
          const result=await response.json()
          if(result.success)showUpdatedNotification();

        } catch (error) {
          console.error(error)
        }
  }
  const showUpdatedNotification = () => {
    setShowUpdated(true);
    setTimeout(() => setShowUpdated(false), 2000);
    reset()
  };

  return (
    <div className="flex flex-col bg-purple-50 h-screen items-center">
      <div className="p-4 m-4 mt-7 mx-4 shadow-lg shadow-violet-200 border-1 border-violet-100 rounded-2xl min-w-96 lg:w-lg bg-white cursor-pointer justify-center" onClick={homeNavigate}>
            <div className='flex justify-center gap-6'>
                <p className='font-bold text-2xl  bg-gradient-to-br from-violet-500 to-blue-800 bg-clip-text text-transparent'>Guard</p>
                <Shield className='mt-1 text-purple-800' />
            </div>
        </div>
      
      <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 m-4 mt-9" />
      <div className="relative">
      <div className="p-6 m-5 rounded-3xl mt-10 bg-white lg:p-12 shadow-md border border-gray-200 text-gray-800 text-lg font-medium">
      <div className="flex flex-col">
      <p className="text-gray-600 font-medium mb-2">Username</p>
      <p className="text-2xl font-semibold text-gray-900">{username}</p>
    </div>
        <br />
        <div className="flex flex-col">
      <p className="text-gray-600 font-medium mb-2">Email</p>
      <p className="text-2xl font-semibold text-gray-900">{email}</p>
    </div>
    {updatePassword?(
      <div className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center">

          <input type="password" placeholder="Old Password"{...register("oldPassword")} className="p-2 rounded-lg border-indigo-50 focus:border-purple-500 focus:ring-2 focus:ring-violet-200 border-2 transition-all duration-300"/>
          {errors.oldPassword && <p>{errors.oldPassword.message}</p>}

          <input type="password" placeholder="New Password"{...register("newPassword")} className="p-2 rounded-lg border-indigo-50 focus:border-purple-500 focus:ring-2 focus:ring-violet-200 border-2 transition-all duration-300"/>
          {errors.newPassword && <p>{errors.newPassword.message}</p>}

          <input type="password" placeholder="Confirm Password"{...register("confirmPassword")} className="p-2 rounded-lg border-indigo-50 focus:border-purple-500 focus:ring-2 focus:ring-violet-200 border-2 transition-all duration-300"/>
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

          <button type="submit" className="border-1 rounded-2xl p-4 shadow-lg hover:shadow-xl border-indigo-100 hover:border-indigo-300 transition-all duaration-300 hover:scale-105 font-medium text-wrap bg-gradient-to-br from-violet-500 to-blue-800 text-white cursor-pointer w-48">Update</button>
        </form>
      </div>
    ):(
      <div className="flex justify-center">
        <button type="submit" className="border-1 rounded-2xl p-4 mt-6 shadow-lg hover:shadow-xl border-indigo-100 hover:border-indigo-300 transition-all duaration-300 hover:scale-105 font-medium text-wrap bg-gradient-to-br from-violet-500 to-blue-800 text-white cursor-pointer" onClick={()=>{setUpdatePassword(true)}}>Update Password</button>
      </div>
    )}
    <div className="absolute items-center w-auto">
    {showUpdated && (
        <div className=" mt-4 ml-7  transform  bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-out">
          <Check className="w-5 h-5 text-green-400" />
          Password Updated
        </div>
        )}
    </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default ProfilePage
