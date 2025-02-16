import { Heart, MessageCircle, Share2 } from "lucide-react";

const posts = [ 
  {
    id: 1,
    user: "Tech Club",
    avatar: "/placeholder.svg",
    image: "/placeholder.svg",
    caption: "Exciting workshop on AI coming up next week!",
    likes: 120,
    comments: 15,
  },
  {
    id: 2,
    user: "Art Society",
    avatar: "/placeholder.svg",
    image: "/placeholder.svg",
    caption: "Check out our latest exhibition in the student center.",
    likes: 89,
    comments: 7,
  },

];

export default function Feed() {
  return (
    <div className="space-y-6">
      {
      posts.map((post) => (
        <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center p-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
            <img
              src={post.avatar}
              alt={`${post.user}'s avatar`}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <span className="ml-3 font-semibold">{post.user}</span>
          </div>
          <img src={post.image} alt="Post image" className="w-full" />
          <div className="p-4">
            <div className="flex space-x-4 mb-2">
              <button className="text-gray-600 hover:text-red-500">
                <Heart className="w-6 h-6" />
              </button>
              <button className="text-gray-600 hover:text-blue-500">
                <MessageCircle className="w-6 h-6" />
              </button>
              <button className="text-gray-600 hover:text-green-500">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
            <p className="font-semibold text-teal-600">{post.likes} likes</p>
            <p>
              <span className="font-semibold">{post.user}</span> {post.caption}
            </p>
            <p className="text-gray-500 text-sm mt-1">View all {post.comments} comments</p>
          </div>
        </div>
      ))}
    </div>
  );
}
