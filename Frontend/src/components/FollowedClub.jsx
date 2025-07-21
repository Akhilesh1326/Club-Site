import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// Random border color generator
const getRandomBorderColor = () => {
  const colors = [
    "border-blue-500",
    "border-pink-500",
    "border-yellow-500",
    "border-green-500",
    "border-purple-500",
    "border-red-500",
    "border-indigo-500",
    "border-orange-500",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export default function FollowedClubs() {
  const [followClubs, setFollowClubs] = useState([]);

  useEffect(() => {
    async function getFollowClubs() {
      try {
        const response = await axios.get("/api/club-management/get-followed-clubs");
        const updatedClubs = response.data.map((club) => ({
          ...club,
          color: getRandomBorderColor(),
        }));
        setFollowClubs(updatedClubs);
        console.log(response.data)
      } catch (error) {
        console.log("Error while getting clubs: ", error.message);
      }
    }
    getFollowClubs();
  }, []);

  return (
    <div className="mb-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4 text-[#96BADC]">Clubs You Follow</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide p-2">
        {followClubs.length > 0 ? (
          followClubs.map((club) => (
            <Link
              key={club.id}
              to={`/club/${club.id}`}
              className="flex flex-col items-center"
            >
              <div
                className={`relative w-16 h-16 rounded-full border-2 ${club.color} p-1 bg-white`}
              >
                <img
                  src={club.avatar || "/images/default-club.jpg"}
                  alt={club.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <p className="text-xs text-center mt-1 w-16 truncate">
                {club.name}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-sm text-gray-500">No clubs followed yet.</p>
        )}
      </div>
    </div>
  );
}
