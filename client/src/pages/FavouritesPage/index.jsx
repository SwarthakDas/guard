import { Check, Copy, Eye, EyeOff, Shield, StarIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const FavouritesPage = () => {
  const [passwords,setPasswords]=useState([])
  const [loading,setLoading]=useState(true)
  const [pinVerified,setPinVerified]=useState(false)
  const [error, setError] = useState(null);
  const navigate=useNavigate()
  const homeNavigate=()=>{navigate("/")}
  const {id,token}=useSelector((state)=>state.auth)
  const [visiblePasswords, setVisiblePasswords] = useState({})
  const [showCopied,setShowCopied]=useState(false)

  const{
      register,
      handleSubmit,
  }=useForm()
    const pinVerify=async(data)=>{
      try {
        const response=await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/auth/${id}/pin-verify`,
          {
            method:"POST",
            headers:{"Authorization":`Bearer ${token}`,"Content-Type": "application/json"},
            body: JSON.stringify(data)
          }
        )
        const verify=await response.json()
        if(verify.message){
          setPinVerified(true)
          const passwordResponse=await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/favourite/${id}/favourites`,
            {
              method:"POST",
              headers:{"Authorization":`Bearer ${token}`,"Content-Type": "application/json"},
              body: JSON.stringify(data)
            }
          )
          const getPasswords=await passwordResponse.json()
          if(!getPasswords.savedFavourites)setError(getPasswords.message);
          else{
            setPasswords(getPasswords.savedFavourites)
          }
          setLoading(false);
        }
        else alert("Incorrect Pin");
        
      } catch (error) {
        console.error("Login Error:", error.message);
        setError(error.message);
      }
    }

    const toggleFavourite = async(passwordId) => {
      if (window.confirm("Are you sure you want to remove this password from Favourites?")) {
      try {
        const response=await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/favourite/${id}`,
          {
            method:"POST",
            headers:{"Authorization":`Bearer ${token}`,"Content-Type": "application/json"},
            body: JSON.stringify({passwordId})
          }
        )
        const result=await response.json()
        if(result.message==="Password favourite status updated"){
          setPasswords(passwords.map(pass =>
            pass.id === passwordId ? { ...pass, favourite: result.favourite } : pass
          ));
        }
      } catch (error) {
        console.error("Login Error:", error.message);
        setError(error.message);
      }
    }
    };
    
    const handleDelete = async(passwordId) => {
      if (window.confirm("Are you sure you want to delete this password?")) {
        try {
          const response=await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/${id}/delete`,
            {
              method:"POST",
              headers:{"Authorization":`Bearer ${token}`,"Content-Type": "application/json"},
              body: JSON.stringify({passwordId})
            }
          )
          const result=await response.json()
          if(result.message==="Password deleted successfully"){
            setPasswords(passwords.filter(pass => pass.id !== passwordId));
          }
        } catch (error) {
          console.error("Login Error:", error.message);
          setError(error.message);
        }
      }
    };

    const togglePasswordVisibility = (passwordId) => {
      setVisiblePasswords(prev => ({
        ...prev,
        [passwordId]: !prev[passwordId]
      }));
    };
    
    const renderPassword = (pass) => {
      const isVisible = visiblePasswords[pass.id];
      return (
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Password: </span>
          <span className="font-mono">
            {isVisible ? pass.password : '•'.repeat(8)}
          </span>
          <button 
            onClick={() => togglePasswordVisibility(pass.id)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={isVisible ? "Hide password" : "Show password"}
          >
            {isVisible ? 
              <Eye className="w-4 h-4 text-gray-500" /> : 
              <EyeOff className="w-4 h-4 text-gray-500" />
            }
          </button>
        </div>
      );
    };

    const copyToClipboard=(password)=>{
        window.navigator.clipboard.writeText(password)
      }

      const showCopiedNotification = () => {
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      };

  if(!pinVerified){
    return(
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
      <div className=" p-4 m-5 rounded-3xl mt-10 bg-white lg:p-10">
        <form onSubmit={handleSubmit(pinVerify)} className="flex flex-col gap-4 items-center">

          <input type="password" placeholder="Enter Pin"{...register("pin")} className="p-2 rounded-lg border-indigo-50 focus:border-purple-500 focus:ring-2 focus:ring-violet-200 border-2 transition-all duration-300"/>

          <button type="submit" className="border-1 rounded-2xl p-4 shadow-lg hover:shadow-xl border-indigo-100 hover:border-indigo-300 transition-all duaration-300 hover:scale-105 font-medium text-wrap bg-gradient-to-br from-violet-500 to-blue-800 text-white cursor-pointer w-48">Verify</button>
        </form>
      </div>
      </div>
      </div>
    </div>
    )
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
        <div className="p-4 overflow-auto">
        <div>
        <div className="p-4">
        {loading && <p className="text-center text-gray-500">Loading passwords...</p>}
        {!loading && passwords.length===0 && <p className="text-center text-gray-500">No Favourite Passwords found</p>}
        
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {passwords.map((pass) => (
              <div
                key={pass.id}
                className="shadow-md border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition relative"
              >
                <h3 className="text-lg font-semibold">{pass.name}</h3>
                {renderPassword(pass)}
                <p className="text-xs text-gray-400">Created: {new Date(pass.created).toLocaleDateString()}</p>
                
                <div className="flex">
                <button 
                  onClick={() => handleDelete(pass.id)}
                  className="mt-2 px-3 py-1 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-100"
                >
                  Delete
                </button>
                <button className="absolute right-5 bottom-7" onClick={() => toggleFavourite(pass.id)}>
                    {pass.favourite ? (
                      <p className="text-xl">⭐</p>
                    ) : (
                      <StarIcon className="text-gray-400" />
                    )}
                </button>
                <button className="absolute right-2 top-2" onClick={()=>{copyToClipboard(pass.password);showCopiedNotification()}}>
                  <Copy className="text-gray-400 h-5"/>
                </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
      </div>
      {showCopied && (
        <div className=" bottom-1/5 left-1/2 ml-32 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-out">
          <Check className="w-5 h-5 text-green-400" />
          Copied
        </div>
        )}
      </div>
    )
  }
  
}

export default FavouritesPage
