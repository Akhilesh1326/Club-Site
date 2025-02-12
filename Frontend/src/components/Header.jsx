import { useState } from 'react';
import { FaHome } from "react-icons/fa";
import { MdOutlineExplore, MdContactPage } from "react-icons/md";
import { FcAbout } from "react-icons/fc";


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-sky-600 bg-gradient-to-r from-blue-500 via-sky-500 to-teal-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="#" className="text-white text-2xl font-bold">
                Campus Connect
              </a>
            </div>
            <div className="hidden md:flex space-x-4">
              <a href="/home" className="text-white hover:text-blue-200">  Home</a>
              <a href="/explore" className="text-white hover:text-blue-200">  Explore Clubs</a>
              <a href="#" className="text-white hover:text-blue-200">  About</a>
              <a href="#" className="text-white hover:text-blue-200">  Contact</a>
            </div>
            <div className="md:hidden">
              <button id="menu-btn" className="text-white" onClick={()=>setIsMenuOpen(!isMenuOpen)}>
                <svg className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
                </svg>
              </button>
            {isMenuOpen && (
                <div className='absolute top-16 right-0 bg-slate-300 rounded shadow-lg flex flex-col p-4 md:hidden bg-opacity-90'>
                    <div className='flex items-center my-2 mx-2 mr-10 border-b-2 border-gray-400 rounded-md w-full cursor-pointer'><FaHome className="mr-2 mt-1"/>Home</div>
                    <div className='flex items-center my-2 mx-2 mr-10 border-b-2 border-gray-400 rounded-md w-full cursor-pointer'><MdOutlineExplore className="mr-2 mt-1"/>Explore</div>
                    <div className='flex items-center my-2 mx-2 mr-10 border-b-2 border-gray-400 rounded-md w-full cursor-pointer'><FcAbout className="mr-2 mt-1"/>About</div>
                    <div className='flex items-center my-2 mx-2 mr-10 border-b-2 border-gray-400 rounded-md w-full cursor-pointer'><MdContactPage className="mr-2 mt-1"/>Contact</div>
                </div>
            )}
            </div>
          </div>
        </div>
      </nav>
    );
};

export default Header;
