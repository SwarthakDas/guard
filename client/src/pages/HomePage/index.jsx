import { useState } from "react"
import Navbar from "../Navbar"
import { ChevronDown, Shuffle } from 'lucide-react'

const HomePage = () => {
  const [password,setPassword]=useState("")
  const [length,setLength]=useState(10)
  const [number,setNumber]=useState(true)
  const [characters,setCharacters]=useState(true)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>

      <div className="flex flex-col items-center">
        <Navbar/>
        <p className="text-center text-2xl font-semibold pt-3 bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text text-transparent">Welcome to Guard</p>
        <div className="relative group my-10 max-w-96">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
          <div className="relative">
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white border-2 border-violet-100 rounded-2xl p-4 pr-24 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-300" placeholder="Password"/>
            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gradient-to-r from-violet-500 to-blue-500 rounded-4xl text-white hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">
              <Shuffle className="w-5 h-6" />
            </button>
          </div>
        </div>
        <div className="flex max-w-96 items-center w-full justify-center gap-6">
          <div className="w-40">
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
        <div className="flex justify-between gap-10 my-10">
          <button className="aspect-square border-1 rounded-2xl p-4 shadow-lg hover:shadow-xl border-indigo-100 hover:border-indigo-300 transition-all duaration-300 hover:scale-105 px-9 font-medium bg-gradient-to-br from-violet-600 to-blue-800 bg-clip-text text-transparent">Copy</button>
          <button className=" border-1 rounded-2xl p-6 px-9 shadow-lg hover:shadow-xl border-indigo-100 hover:border-indigo-300 transition-all duaration-300 hover:scale-105 font-medium text-wrap bg-gradient-to-br from-violet-500 to-blue-800 text-white">Copy <br/>&<br/>Save</button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
