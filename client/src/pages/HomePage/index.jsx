import { useCallback, useEffect, useRef, useState } from "react"
import { Check, ChevronDown, Key, LogIn, Shield, ShieldCheck, Shuffle, Star, User } from 'lucide-react'

const HomePage = () => {
  const [password,setPassword]=useState("")
  const [length,setLength]=useState(10)
  const [number,setNumber]=useState(true)
  const [characters,setCharacters]=useState(true)
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded,setIsExpanded]=useState(false)
  const [menuZIndex, setMenuZIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false)
  const [showCopied,setShowCopied]=useState(false)
  const passRef=useRef(null)


  const generator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number)str+="1234567890";
    if(characters)str+="!@#$%^&*"
    for (let i = 0; i < length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,number,characters,setPassword])

  const copyToClipboard=useCallback(()=>{
    passRef.current?.select()
    passRef.current?.setSelectionRange(0,99)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    generator()
  },[length,number,characters,generator])

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <1024) 
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const showCopiedNotification = () => {
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };
  

  

  return (
    <div className="flex justify-center gap-64">
      {isMobile?(<div className="absolute top-1/3 -left-2" style={{ zIndex: menuZIndex }}>
          <div className="mx-auto max-w-md " >
            <nav className="relative " onClick={() =>{ setIsExpanded(true);setTimeout(() => setMenuZIndex(50), 50)}} onMouseLeave={() => { setIsExpanded(false);setTimeout(() => setMenuZIndex(0), 300);}}  >
              <div
                className={`absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-r-2xl transition-all duration-300 ease-in-out ${
                  isExpanded ? "w-full" : "w-14"
                }`}
              />
              <ul className="relative space-y-4 p-4">
                <li>
                  <a href="#" className="flex items-center text-white transition-all duration-300 hover:opacity-75">
                    <LogIn className="h-6 w-6" />
                    <span
                      className={`ml-4 whitespace-nowrap transition-all duration-300 ${
                        isExpanded ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      Login/Signup
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-white transition-all duration-300 hover:opacity-75">
                    <Key className="h-6 w-6" />
                    <span
                      className={`ml-4 whitespace-nowrap transition-all duration-300 ${
                        isExpanded ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      Your Passwords
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-white transition-all duration-300 hover:opacity-75">
                    <Star className="h-6 w-6" />
                    <span
                      className={`ml-4 whitespace-nowrap transition-all duration-300 ${
                        isExpanded ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      Favourites
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-white transition-all duration-300 hover:opacity-75">
                    <User className="h-6 w-6" />
                    <span
                      className={`ml-4 whitespace-nowrap transition-all duration-300 ${
                        isExpanded ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      Account
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-white transition-all duration-300 hover:opacity-75">
                    <ShieldCheck className="h-6 w-6" />
                    <span
                      className={`ml-4 whitespace-nowrap transition-all duration-300 ${
                        isExpanded ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      Strength Checker
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
      </div>
    ):(
      <div>
        <div className="w-1/4 min-h-screen fixed left-0 top-0 bg-gradient-to-b from-purple-600 to-blue-600 p-6">
        <div className='flex justify-center gap-6'>
                <p className='font-bold text-2xl  bg-gradient-to-br from-violet-50 to-blue-100 bg-clip-text text-transparent'>Guard</p>
                <Shield className='mt-1 text-white' />
            </div>
          <div className="pt-16 pl-1 pr-1">
            <ul className="space-y-6">
              <li>
                <a href="#" className="flex items-center text-white transition-all duration-300 hover:opacity-75">
                  <LogIn className="h-6 w-6" />
                  <span className="ml-4 whitespace-nowrap font-medium">Login/Signup</span>
                </a>
              </li>
              <hr className="border-white "/>
              <li>
                <a href="#" className="flex items-center text-white transition-all duration-300 hover:opacity-75">
                  <Key className="h-6 w-6" />
                  <span className="ml-4 whitespace-nowrap font-medium">Your Passwords</span>
                </a>
              </li>
              <hr className="border-white "/>
              <li>
                <a href="#" className="flex items-center text-white transition-all duration-300 hover:opacity-75">
                  <Star className="h-6 w-6" />
                  <span className="ml-4 whitespace-nowrap font-medium">Favourites</span>
                </a>
              </li>
              <hr className="border-white "/>
              <li>
                <a href="#" className="flex items-center text-white transition-all duration-300 hover:opacity-75">
                  <User className="h-6 w-6" />
                  <span className="ml-4 whitespace-nowrap font-medium">Account</span>
                </a>
              </li>
              <hr className="border-white "/>
              <li>
                <a href="#" className="flex items-center text-white transition-all duration-300 hover:opacity-75">
                  <ShieldCheck className="h-6 w-6" />
                  <span className="ml-4 whitespace-nowrap font-medium">Strength Checker</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )}
      


      <div className="flex flex-col items-center ">
        <div className="p-4 m-4 mt-7 mx-4 shadow-lg shadow-violet-200 border-1 border-violet-100 rounded-2xl min-w-96 lg:w-xl bg-white">
              <div className='flex justify-center gap-6'>
                  <p className='font-bold text-2xl  bg-gradient-to-br from-violet-500 to-blue-800 bg-clip-text text-transparent'>Guard</p>
                  <Shield className='mt-1 text-purple-800' />
              </div>
          </div>
        <p className="text-center text-2xl font-semibold pt-3 bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text text-transparent">Experience Maximum Security</p>
        <div className="relative group my-10 max-w-96">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
          <div className="relative">
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white border-2 border-violet-100 rounded-2xl p-4 pr-24 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-300" placeholder="Password"/>
            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gradient-to-r from-violet-500 to-blue-500 rounded-4xl text-white hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer" onClick={generator}>
              <Shuffle className="w-5 h-6" />
            </button>
          </div>
        </div>
        <div className="flex max-w-80 items-center w-full justify-center ">
          <div className="w-40 relative">
            <input className="cursor-pointer" type="range" min={6} max={75} value={length} onChange={(e)=>setLength(e.target.value)} />
            <label className="text-indigo-800 font-medium">Length:<input value={length} placeholder={length} className=" w-8 rounded-sm ml-1 px-1 cursor-pointer" onChange={(e) => setLength(e.target.value)}/></label>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-40 flex justify-between items-center bg-white border-2 border-violet-200 rounded-lg px-4 py-2 shadow-md  focus:border-violet-300 focus:ring-2 focus:ring-violet-200 transition-all duration-300 text-blue-700 font-medium cursor-pointer hover:text-blue-900"
            >
              Options
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {isOpen && (
              <div className="absolute mt-2 w-40 bg-white border border-purple-300 rounded-lg shadow-lg p-3">
                <div className="flex items-center gap-3 py-1">
                  <input
                    className="cursor-pointer appearance-none w-5 h-5 border-2 border-violet-400 rounded-md checked:bg-violet-700 checked:border-transparent focus:ring-2 focus:ring-violet-300 transition-all"
                    type="checkbox"
                    checked={number}
                    onChange={() => setNumber((prev) => !prev)}
                  />
                  <label className="text-violet-700 font-medium cursor-pointer hover:text-violet-900 transition">
                    Nums
                  </label>
                </div>
                <div className="flex items-center gap-3 py-1">
                  <input
                    className="cursor-pointer appearance-none w-5 h-5 border-2 border-violet-400 rounded-md checked:bg-violet-700 checked:border-transparent focus:ring-2 focus:ring-violet-300 transition-all"
                    type="checkbox"
                    checked={characters}
                    onChange={() => setCharacters((prev) => !prev)}
                  />
                  <label className="text-violet-700 font-medium cursor-pointer hover:text-violet-900 transition">
                    Chars
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between gap-6 my-10">
          <button className="relative aspect-square border-1 rounded-2xl p-4 shadow-lg hover:shadow-xl border-indigo-100 hover:border-indigo-300 transition-all duaration-300 hover:scale-105 px-9 font-medium bg-gradient-to-br from-violet-600 to-blue-800 bg-clip-text text-transparent cursor-pointer" onClick={()=>{copyToClipboard(); showCopiedNotification();}}>Copy</button>
          <button className=" border-1 rounded-2xl p-6 px-9 shadow-lg hover:shadow-xl border-indigo-100 hover:border-indigo-300 transition-all duaration-300 hover:scale-105 font-medium text-wrap bg-gradient-to-br from-violet-500 to-blue-800 text-white cursor-pointer" onClick={()=>{copyToClipboard(); showCopiedNotification();}}>Copy <br/>&<br/>Save</button>
        </div>
        {showCopied && (
        <div className=" bottom-1/5 left-1/2 ml-32 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-out">
          <Check className="w-5 h-5 text-green-400" />
          Copied
        </div>
        )}
      </div>
      

    </div>
  )
}

export default HomePage
