import { Shield  } from 'lucide-react';


const Navbar = () => {
  return (
        <div className="p-4 m-4 mt-7 mx-4 shadow-lg shadow-violet-200 border-1 border-violet-100 rounded-2xl min-w-96 lg:w-2xl">
            <div className='flex justify-center gap-6'>
                <p className='font-bold text-2xl  bg-gradient-to-br from-violet-500 to-blue-800 bg-clip-text text-transparent'>Guard</p>
                <Shield className='mt-1 text-purple-800' />
            </div>
        </div>
  )
}

export default Navbar
