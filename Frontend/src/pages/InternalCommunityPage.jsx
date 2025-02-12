import { Megaphone, BookOpen, MessageSquare, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import CommunityFooter from "../components/HomeFooter";
import CommunityHeader from "../components/HomeHeader";

const InternalCommunityPage = () => (
  <div className="bg-gray-50 min-h-screen">
    <CommunityHeader />

    <main className="max-w-6xl mx-auto mt-8 pb-20 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Community Hub</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {[ 
          {
            icon: <Megaphone className="w-6 h-6 text-blue-500 mr-2" />, 
            title: "Announcements", 
            content: (
              <>
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-gray-800">New Club Registration Open</h3>
                  <p className="text-gray-600 text-sm mt-1">Register your club for the upcoming semester by June 30th.</p>
                  <span className="text-xs text-gray-500 mt-2 block">June 1, 2023</span>
                </div>
                <Link href="/announcements" className="text-blue-500 hover:underline text-sm mt-4 inline-block">
                  View all announcements
                </Link>
              </>
            )
          },
          {
            icon: <BookOpen className="w-6 h-6 text-green-500 mr-2" />, 
            title: "Club Directory", 
            content: (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/clubs/1" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition">
                    <h3 className="font-medium text-gray-800">Chess Club</h3>
                    <p className="text-gray-600 text-sm mt-1">Games</p>
                  </Link>
                </div>
                <Link href="/clubs" className="text-green-500 hover:underline text-sm mt-4 inline-block">
                  View all clubs
                </Link>
              </>
            )
          },
          {
            icon: <MessageSquare className="w-6 h-6 text-purple-500 mr-2" />, 
            title: "Discussion Board", 
            content: (
              <>
                <div className="border-b border-gray-200 pb-4">
                  <Link href="/discussions/1" className="block hover:bg-gray-50 transition p-2 -mx-2 rounded">
                    <h3 className="font-medium text-gray-800">Ideas for Club Fundraising</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      What are some effective ways to raise funds for our club activities?
                    </p>
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                      <span>Jane Doe</span>
                      <span>15 replies</span>
                    </div>
                  </Link>
                </div>
                <Link href="/discussions" className="text-purple-500 hover:underline text-sm mt-4 inline-block">
                  View all discussions
                </Link>
              </>
            )
          },
          {
            icon: <FileText className="w-6 h-6 text-orange-500 mr-2" />, 
            title: "Resources", 
            content: (
              <>
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-400 mr-2" />
                  <Link
                    href="/resources/club-leadership-guide.pdf"
                    className="text-gray-800 hover:text-blue-500 transition"
                  >
                    Club Leadership Guide
                  </Link>
                  <span className="text-xs text-gray-500 ml-auto">PDF</span>
                </div>
                <Link href="/resources" className="text-orange-500 hover:underline text-sm mt-4 inline-block">
                  View all resources
                </Link>
              </>
            )
          }
        ].map((section, index) => (
          <section key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              {section.icon}
              <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
            </div>
            {section.content}
          </section>
        ))}
      </div>
    </main>

    <CommunityFooter />
  </div>
);

export default InternalCommunityPage;
