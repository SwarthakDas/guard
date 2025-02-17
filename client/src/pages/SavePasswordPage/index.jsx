import {useForm} from "react-hook-form"
import { Check, Shield } from "lucide-react"
import { useSelector} from "react-redux"
import {useLocation, useNavigate} from "react-router-dom"
import { useState } from "react"

const SavePasswordPage = () => {
  const navigate=useNavigate()
  const {id,token}=useSelector((state)=>state.auth)
  const [showCopied,setShowCopied]=useState(false)
  const location = useLocation();
  const [password,setPassword]=useState(location.state?.password)

  const{
    register,
    handleSubmit,
    reset
  }=useForm()
  const onSubmit=async (data)=>{
    try {
      const response=await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/password/${id}/save`,
        {
          method:"POST",
          headers:{"Authorization":`Bearer ${token}`,"Content-Type": "application/json"},
          body: JSON.stringify(data)
        }
      )
      const verify=await response.json()
      if(verify.message==="Password saved successfully"){showCopiedNotification();reset();}
      else alert(verify.message);
      setPassword("")
    } catch (error) {
      console.error("Login Error:", error.message);
      alert(error.message); 
    }
  }

  const homeNavigate=()=>{navigate("/")}

  const showCopiedNotification = () => {
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="flex flex-col bg-purple-50 h-screen items-center">
      <div className="p-4 m-4 mt-7 mx-4 shadow-lg shadow-violet-200 border-1 border-violet-100 rounded-2xl min-w-96 lg:w-lg bg-white cursor-pointer" onClick={homeNavigate}>
            <div className='flex justify-center gap-6'>
                <p className='font-bold text-2xl  bg-gradient-to-br from-violet-500 to-blue-800 bg-clip-text text-transparent'>Guard</p>
                <Shield className='mt-1 text-purple-800' />
            </div>
        </div>
      
      <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 m-4 mt-9" />
      <div className="relative">
      <div className=" p-4 m-5 rounded-3xl mt-10 bg-white lg:p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center">
          <input type="text" placeholder="Password Name"{...register("name")} className="p-2 rounded-lg border-indigo-50 focus:border-purple-500 focus:ring-2 focus:ring-violet-200 border-2 transition-all duration-300"/>

          <input type="text" placeholder="Password"{...register("password")} className="p-2 rounded-lg border-indigo-50 focus:border-purple-500 focus:ring-2 focus:ring-violet-200 border-2 transition-all duration-300" value={password} onChange={(e) => setPassword(e.target.value)}/>
          
          <input type="password" placeholder="6-digit Pin"{...register("pin")} className="p-2 rounded-lg border-indigo-50 focus:border-purple-500 focus:ring-2 focus:ring-violet-200 border-2 transition-all duration-300"/>

          <button type="submit" className="border-1 rounded-2xl p-4 shadow-lg hover:shadow-xl border-indigo-100 hover:border-indigo-300 transition-all duaration-300 hover:scale-105 font-medium text-wrap bg-gradient-to-br from-violet-500 to-blue-800 text-white cursor-pointer w-48">Save</button>
        </form>
      </div>
      </div>
      </div>
      {showCopied && (
        <div className=" bottom-1/5 left-1/2 ml-32 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-out">
          <Check className="w-5 h-5 text-green-400" />
          Saved
        </div>
        )}
    </div>
  )
}

export default SavePasswordPage
