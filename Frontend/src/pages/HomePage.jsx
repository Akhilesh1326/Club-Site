import { Link } from "react-router-dom";
import { Home, Users, Compass, Search, User } from "lucide-react";
import Feed from "../components/Feed";
import FollowedClubs from "../components/FollowedClub";

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
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
                <Link to="/profile" className="text-white hover:text-gray-200">
                  <User className="w-6 h-6" />
                  <span className="sr-only">Profile</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-2xl mx-auto mt-4 pb-20 px-4">
        <FollowedClubs />
        <Feed />
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <nav className="max-w-2xl mx-auto">
          <ul className="flex justify-around py-2">
            <li>
              <Link to="/" className="flex flex-col items-center text-teal-500 hover:text-teal-600">
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
    </div>
  );
}
