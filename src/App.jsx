import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import LiveMatches from "./components/LiveMatches";
import Predictor from "./components/Predictor";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <main className="max-w-7xl mx-auto px-8">

        <Hero />

        <Stats />

        <LiveMatches />

        <Predictor />

      </main>

    </div>
  );
}