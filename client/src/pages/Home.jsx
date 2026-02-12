import { Link } from "react-router-dom";
import { Car, Shield, Zap, ArrowRight } from "lucide-react";

const Home = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[90vh] flex flex-col items-center justify-center text-center px-4 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Drive Your <span className="text-orange-500">Dream</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the thrill of the open road with our premium fleet of
            vehicles. From luxury sedans to high-performance sports cars, we
            have the perfect ride for you.
          </p>

          <div className="flex gap-4 justify-center">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold text-lg flex items-center gap-2 transition-transform hover:scale-105"
              >
                Go to Dashboard <ArrowRight size={20} />
              </Link>
            ) : (
              <Link
                to="/register"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold text-lg flex items-center gap-2 transition-transform hover:scale-105"
              >
                Get Started <ArrowRight size={20} />
              </Link>
            )}
            <Link
              to="/login"
              className="border border-white hover:bg-white hover:text-black text-white px-8 py-3 rounded-full font-bold text-lg transition-colors"
            >
              Browse Fleet
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Why Choose <span className="text-orange-500">Us?</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-zinc-900 p-8 rounded-2xl hover:bg-zinc-800 transition-colors border border-zinc-800">
            <div className="bg-orange-500/20 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Car className="text-orange-500" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Premium Fleet</h3>
            <p className="text-gray-400">
              Access a wide range of top-tier vehicles maintained to the highest
              standards for safety and comfort.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-zinc-900 p-8 rounded-2xl hover:bg-zinc-800 transition-colors border border-zinc-800">
            <div className="bg-orange-500/20 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Zap className="text-orange-500" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Booking</h3>
            <p className="text-gray-400">
              Our seamless digital platform allows you to book your dream car in
              minutes, not hours.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-zinc-900 p-8 rounded-2xl hover:bg-zinc-800 transition-colors border border-zinc-800">
            <div className="bg-orange-500/20 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Shield className="text-orange-500" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure & Safe</h3>
            <p className="text-gray-400">
              Your safety is our priority. Every vehicle undergoes a 50-point
              inspection before handover.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Simple */}
      <footer className="bg-zinc-950 py-8 text-center text-gray-500 border-t border-zinc-900">
        <p>&copy; 2026 DriveRental. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
