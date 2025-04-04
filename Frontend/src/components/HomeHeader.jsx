import {Search, User } from "lucide-react";
import { Link } from "react-router-dom";
const HomeHeader = () => {
  return (
<header className="sticky top-0 bg-gradient-to-r from-blue-500 to-teal-500 text-white z-10">
        <div className="max-w-2xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-extrabold">ClubConnect</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/search" className="text-white hover:text-gray-200">
                  <Search className="w-6 h-6" />
                  <span className="sr-only">Search</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-white hover:text-gray-200">
                  <User className="w-6 h-6" />
                  <span className="sr-only">Profile</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

  )
}

export default HomeHeader
