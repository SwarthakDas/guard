import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { SignupSchema } from "../../schemas/SignupSchema"
import { Shield } from "lucide-react"
import {useDispatch} from "react-redux"
import {setLogin} from "../../state/index.js"
import {useNavigate} from "react-router-dom"
import { useState } from "react"

const SignUp = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [tnc,setTnc]=useState(false);
  const [checkbox,setCheckbox]=useState(false)

  const{
    register,
    handleSubmit,
    formState:{errors},
  }=useForm({
    resolver:zodResolver(SignupSchema)
  })
  const onSubmit=async (data)=>{
    try {
      delete data.confirmPassword
      const response=await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/auth/register`,
        {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify(data)
        }
      )
      const signup=await response.json()
      if(signup){
        dispatch(
          setLogin({
            id: signup.id,
            token: signup.token
          })
        )
        navigate("/")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const homeNavigate=()=>{navigate("/")}
  const acceptTerms = () => {
    if (checkbox) {
      setTnc(true);
    }
  };
  
  if (!tnc) {
    return (
      <div className="flex flex-col bg-purple-50 h-screen items-center text-sm">
        <div className="p-4 m-2  mt-8 mx-4 shadow-lg shadow-violet-200 border-1 border-violet-100 rounded-2xl min-w-96 lg:w-lg bg-white cursor-pointer">
            <div className='flex justify-center gap-6' onClick={homeNavigate}>
                <p className='font-bold text-2xl  bg-gradient-to-br from-violet-500 to-blue-800 bg-clip-text text-transparent'>Guard</p>
                <Shield className='mt-1 text-purple-800' />
            </div>
      </div>
      <div className="p-6 m-5 bg-white rounded-3xl shadow-lg w-11/12 lg:w-2/3 flex items-center flex-col ">
        
        <h2 className="text-xl font-bold text-red-600">⚠ Important Notice</h2>
        <p className="text-gray-800 mt-2 text-center">
          Your PIN is the key to accessing your data.<br/> <span className="font-bold text-red-600">If you forget your PIN, all stored data will be lost.</span> <br/>
          There is no way to recover lost data without the correct PIN.
        </p>
  
        <p className="text-gray-700 mt-3">
          By signing up, you acknowledge and accept the following:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          <li className="py-1">All stored data is encrypted and accessible only with your PIN.</li>
          <li className="py-1">We do not store or recover lost PINs for security reasons.</li>
          <li className="py-1">Make sure to write down or securely store your PIN.</li>
        </ul>
  
        <div className="flex items-center mt-4">
          <input 
            type="checkbox" 
            className="w-5 h-5 text-violet-500 focus:ring-violet-300 border-2 rounded-md cursor-pointer" 
            onChange={() => setCheckbox(!checkbox)} 
            checked={checkbox} 
          />
          <label htmlFor="acceptTerms" className="ml-2 text-gray-800 ">
            I understand and accept the terms and conditions.
          </label>
        </div>
  
        {!checkbox && <p className="text-red-500 mt-1 ">You must accept the terms to continue.</p>}
  
        <button 
          type="button" 
          className={` mt-4 font-bold p-3 px-6 rounded-xl transition-all duration-300 shadow-lg 
            ${checkbox ? "bg-gradient-to-br from-violet-500 to-blue-800 text-white hover:scale-105" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
          `}
          onClick={acceptTerms}
          disabled={!checkbox} 
        >
          Accept & Continue
        </button>
      </div>
      </div>
    );
  }
 
  else{
  return (
    <div className="flex flex-col bg-purple-50 h-screen items-center">
      <div className="p-4 m-4 mt-7 mx-4 shadow-lg shadow-violet-200 border-1 border-violet-100 rounded-2xl min-w-96 lg:w-lg bg-white cursor-pointer">
            <div className='flex justify-center gap-6' onClick={homeNavigate}>
                <p className='font-bold text-2xl  bg-gradient-to-br from-violet-500 to-blue-800 bg-clip-text text-transparent'>Guard</p>
                <Shield className='mt-1 text-purple-800' />
            </div>
      </div>
      
      <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 m-4 mt-9" />
      <div className="relative">
      <div className=" p-4 m-5 rounded-3xl mt-10 bg-white lg:p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center">
          <input type="text" placeholder="Username"{...register("username")} className="p-2 rounded-lg border-indigo-50 focus:border-purple-500 focus:ring-2 focus:ring-violet-200 border-2 transition-all duration-300"/>
          {errors.username && <p>{errors.username.message}</p>}

          <input type="text" placeholder="Email"{...register("email")} className="p-2 rounded-lg border-indigo-50 focus:border-purple-500 focus:ring-2 focus:ring-violet-200 border-2 transition-all duration-300"/>
          {errors.email && <p>{errors.email.message}</p>}

          <input type="password" placeholder="Password"{...register("password")} className="p-2 rounded-lg border-indigo-50 focus:border-purple-500 focus:ring-2 focus:ring-violet-200 border-2 transition-all duration-300"/>
          {errors.password && <p>{errors.password.message}</p>}
          
          <input type="password" placeholder="Confirm Password"{...register("confirmPassword")} className="p-2 rounded-lg border-indigo-50 focus:border-purple-500 focus:ring-2 focus:ring-violet-200 border-2 transition-all duration-300"/>
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

          <input type="number" placeholder="Pin"{...register("pin")} className="p-2 rounded-lg border-indigo-50 focus:border-purple-500 focus:ring-2 focus:ring-violet-200 border-2 transition-all duration-300"
          title="Your PIN should be remembered and cannot be changed"/>
          {errors.pin && <p>{errors.pin.message}</p>}

          <button type="submit" className="border-1 rounded-2xl p-4 shadow-lg hover:shadow-xl border-indigo-100 hover:border-indigo-300 transition-all duaration-300 hover:scale-105 font-medium text-wrap bg-gradient-to-br from-violet-500 to-blue-800 text-white cursor-pointer w-48">Sign Up</button>
        </form>
        <p className="mt-4 text-sm text-indigo-900">
          Already have an account?{" "}
          <span 
            onClick={() => navigate("/login")} 
            className="text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-blue-800 font-semibold cursor-pointer hover:opacity-80 transition-opacity"
          >
            Login
          </span>
        </p>
      </div>
      </div>
      </div>
    </div>
  )
}
}

export default SignUp
