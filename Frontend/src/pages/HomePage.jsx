import Feed from "../components/Feed";
import FollowedClubs from "../components/FollowedClub";
import HomeFooter from "../components/HomeFooter";
import HomeHeader from "../components/HomeHeader";

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <HomeHeader/>

      <main className="max-w-2xl mx-auto mt-4 pb-20 px-4">
        <FollowedClubs />
        <Feed />
      </main>

      <HomeFooter/>
    </div>
  );
}
