import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { SignupSchema } from "../../schemas/SignupSchema"
import { Shield } from "lucide-react"

const SignUp = () => {
  const{
    register,
    handleSubmit,
    formState:{errors},
  }=useForm({
    resolver:zodResolver(SignupSchema)
  })
  const onSubmit=(data)=>{
    console.log(data)
  }

  return (
    <div className="flex flex-col bg-purple-50 h-screen items-center">
      <div className="p-4 m-4 mt-7 mx-4 shadow-lg shadow-violet-200 border-1 border-violet-100 rounded-2xl min-w-96 lg:w-lg bg-white">
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
          <input type="text" placeholder="Username"{...register("username")} className="p-2 rounded-lg border-indigo-50 focus:border-purple-500 focus:ring-2 focus:ring-violet-200 border-2 transition-all duration-300"/>
          {errors.username && <p>{errors.username.message}</p>}

          <input type="text" placeholder="Email"{...register("email")} className="p-2 rounded-lg border-indigo-50 focus:border-purple-500 focus:ring-2 focus:ring-violet-200 border-2 transition-all duration-300"/>
          {errors.email && <p>{errors.email.message}</p>}

          <input type="password" placeholder="Password"{...register("password")} className="p-2 rounded-lg border-indigo-50 focus:border-purple-500 focus:ring-2 focus:ring-violet-200 border-2 transition-all duration-300"/>
          {errors.password && <p>{errors.password.message}</p>}
          
          <input type="password" placeholder="Confirm Password"{...register("confirmPassword")} className="p-2 rounded-lg border-indigo-50 focus:border-purple-500 focus:ring-2 focus:ring-violet-200 border-2 transition-all duration-300"/>
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

          <input type="number" placeholder="Pin"{...register("pin")} className="p-2 rounded-lg border-indigo-50 focus:border-purple-500 focus:ring-2 focus:ring-violet-200 border-2 transition-all duration-300"/>
          {errors.pin && <p>{errors.pin.message}</p>}

          <button type="submit" className="border-1 rounded-2xl p-4 shadow-lg hover:shadow-xl border-indigo-100 hover:border-indigo-300 transition-all duaration-300 hover:scale-105 font-medium text-wrap bg-gradient-to-br from-violet-500 to-blue-800 text-white cursor-pointer w-48">Sign Up</button>
        </form>
      </div>
      </div>
      </div>
    </div>
  )
}

export default SignUp
