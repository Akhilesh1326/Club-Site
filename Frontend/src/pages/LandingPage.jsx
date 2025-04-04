import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import MouseEffect from "../components/MouseMoveEffect";

const FeatureCard = ({ color, icon, title, description }) => (
    <div className="text-center bg-white shadow-lg p-6 rounded-lg">
      <div className={`${color} mb-4`}>{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
  

const LandingPage = () => {
    
  const navigate = useNavigate()
  return (
    <div className="bg-gray-50 text-gray-800 scroll-smooth">
      <MouseEffect/>
    <Header />

      <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold">Where Clubs Unite and Shine!</h1>
          <p className="mt-4 text-lg">
            Connect with your campus community and showcase your club{"'"}s
            achievements.
          </p>
          <div className="mt-6 sm:space-x-4 sm:flex sm:justify-center grid grid-cols-1 gap-5 mx-10 sm:mx-0">
            <a onClick={()=>{navigate('/log-in')}} href="#"  className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg">Promote Your Event</a>
            <a  href="#"  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg">Explore Clubs</a>
            <a  href="#"  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg">Join a Community</a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              color="text-teal-500"
              icon={
                <svg  className="w-12 h-12 mx-auto"  xmlns="http://www.w3.org/2000/svg"  fill="none"  viewBox="0 0 24 24"  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-2.21 0-4-1.79-4-4S9.79 0 12 0s4 1.79 4 4-1.79 4-4 4zM3.22 10a9 9 0 0117.56 0M21 13v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7"/>
                </svg>
              }
              title="Internal Communities"
              description="Private spaces for universities to connect and collaborate internally."/>
            <FeatureCard
              color="text-purple-500"
              icon={
                <svg className="w-12 h-12 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 9h4.5a2.25 2.25 0 110 4.5h-4.5m0 0v-4.5m4.5 4.5v4.5a2.25 2.25 0 11-4.5 0v-4.5z" />
                </svg>
              }
              title="Showcase Clubs"
              description="Highlight your club’s achievements and activities to the community."
            />
            <FeatureCard
              color="text-orange-500"
              icon={
                <svg  className="w-12 h-12 mx-auto"  xmlns="http://www.w3.org/2000/svg"  fill="none"  viewBox="0 0 24 24"  stroke="currentColor">
                  <path  strokeLinecap="round"  strokeLinejoin="round"  strokeWidth="2"  d="M14.1 9.9l-4.2 4.2a1.5 1.5 0 11-2.1-2.1l4.2-4.2a1.5 1.5 0 112.1 2.1z"/>
                </svg>
              }
              title="Promote Events"
              description="Advertise your club’s events and competitions to a wider audience."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};


export default LandingPage;
