import { Link } from "react-router-dom"
import { Home, Users, Compass} from "lucide-react";

const HomeFooter = () => {
  return (
<footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <nav className="max-w-2xl mx-auto">
          <ul className="flex justify-around py-2">
            <li>
              <Link to="/home" className="flex flex-col items-center text-teal-500 hover:text-teal-600">
                <Home className="w-6 h-6" />
                <span className="text-xs mt-1">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/explore" className="flex flex-col items-center text-orange-500 hover:text-orange-600">
                <Compass className="w-6 h-6" />
                <span className="text-xs mt-1">Explore</span>
              </Link>
            </li>
            <li>
              <Link to="/community" className="flex flex-col items-center text-purple-500 hover:text-purple-600">
                <Users className="w-6 h-6" />
                <span className="text-xs mt-1">Community</span>
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
  )
}

export default HomeFooter

