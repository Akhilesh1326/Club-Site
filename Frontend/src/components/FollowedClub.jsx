import { Link } from "react-router-dom";

const clubs = [
  { id: 1, name: "Tech Club", avatar: "/placeholder.svg", color: "border-blue-500" },
  { id: 2, name: "Art Society", avatar: "/placeholder.svg", color: "border-pink-500" },
  { id: 3, name: "Debate Team", avatar: "/placeholder.svg", color: "border-yellow-500" },
  { id: 4, name: "Sports Club", avatar: "/placeholder.svg", color: "border-green-500" },
  { id: 5, name: "Music Band", avatar: "/placeholder.svg", color: "border-purple-500" },
];

export default function FollowedClubs() {
  return (
    <div className="mb-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Clubs You Follow</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide p-2">
        {clubs.map((club) => (
          <Link key={club.id} to={`/club/${club.id}`} className="flex flex-col items-center">
            <div className={`relative w-16 h-16 rounded-full border-2 ${club.color} p-1 bg-white`}>
              <img src={club.avatar} alt={club.name} className="w-full h-full rounded-full object-cover" />
            </div>
            <p className="text-xs text-center mt-1 w-16 truncate">{club.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
