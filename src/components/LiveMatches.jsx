import { useEffect, useState } from "react";
import axios from "axios";
import AnalyticsModal from "./AnalyticsModal";

export default function LiveMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadMatches();

    const interval = setInterval(() => {
      loadMatches();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadMatches() {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/live-matches"
      );

      setMatches(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function openAnalytics(match) {
    setSelectedMatch(match);
    setModalOpen(true);
  }

  function closeAnalytics() {
    setModalOpen(false);
    setSelectedMatch(null);
  }

  return (
    <>
      <section className="mb-20">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-black">
              🔥 Live Matches
            </h1>

            <p className="text-slate-400 mt-2">
              Live data powered by CricketData API
            </p>

          </div>

          <button
            onClick={loadMatches}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition"
          >
            Refresh
          </button>

        </div>

        {loading ? (

          <div className="text-center py-20 text-xl">

            Loading Live Matches...

          </div>

        ) : matches.length === 0 ? (

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">

            <h2 className="text-2xl font-bold">
              No Live Matches Found
            </h2>

            <p className="text-slate-400 mt-3">
              Check back later for ongoing matches.
            </p>

          </div>

        ) : (

          <div className="grid lg:grid-cols-2 gap-7">

            {matches.map((match) => {

              const team1 = match.teams?.[0] || "Team 1";
              const team2 = match.teams?.[1] || "Team 2";

              const logo1 =
                match.teamInfo?.[0]?.img ||
                "https://placehold.co/120x120";

              const logo2 =
                match.teamInfo?.[1]?.img ||
                "https://placehold.co/120x120";

              return (

                <div
                  key={match.id}
                  className="rounded-3xl bg-slate-900 border border-slate-800 p-8 hover:border-cyan-500 transition-all duration-300 hover:-translate-y-1 shadow-xl"
                >

                  <div className="flex justify-between items-center">

                    <span
                      className={`px-4 py-1 rounded-full font-bold ${
                        match.matchStarted
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {match.matchStarted ? "LIVE" : "UPCOMING"}
                    </span>

                    <span className="uppercase text-slate-500 font-semibold">
                      {match.matchType}
                    </span>

                  </div>

                  <div className="flex justify-between items-center mt-10">

                    <div className="flex flex-col items-center w-40">

                      <img
                        src={logo1}
                        alt={team1}
                        className="w-20 h-20 rounded-full bg-white object-cover"
                      />

                      <h2 className="font-bold mt-4 text-center">
                        {team1}
                      </h2>

                    </div>

                    <div className="text-5xl font-black text-slate-600">
                      VS
                    </div>

                    <div className="flex flex-col items-center w-40">

                      <img
                        src={logo2}
                        alt={team2}
                        className="w-20 h-20 rounded-full bg-white object-cover"
                      />

                      <h2 className="font-bold mt-4 text-center">
                        {team2}
                      </h2>

                    </div>

                  </div>

                  <div className="mt-8 border-t border-slate-800 pt-6">

                    <p className="text-slate-300 font-medium">
                      {match.status}
                    </p>

                    <p className="text-slate-500 mt-2">
                      📍 {match.venue}
                    </p>

                  </div>

                  {match.score?.length > 0 && (

                    <div className="mt-8 grid gap-4">

                      {match.score.map((innings, index) => (

                        <div
                          key={index}
                          className="rounded-2xl bg-slate-800 border border-slate-700 p-4 flex justify-between items-center"
                        >

                          <div>

                            <p className="font-bold">
                              {innings.inning}
                            </p>

                            <p className="text-slate-400 text-sm">
                              Overs: {innings.o}
                            </p>

                          </div>

                          <div className="text-right">

                            <h2 className="text-2xl font-black text-cyan-400">
                              {innings.r}/{innings.w}
                            </h2>

                          </div>

                        </div>

                      ))}

                    </div>

                  )}

                  <button
                    onClick={() => openAnalytics(match)}
                    className="w-full mt-8 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-90 transition rounded-2xl py-4 font-bold text-lg shadow-lg"
                  >
                    📊 Analyze Match
                  </button>

                </div>

              );

            })}

          </div>

        )}

      </section>

      <AnalyticsModal
        match={selectedMatch}
        isOpen={modalOpen}
        onClose={closeAnalytics}
      />
    </>
  );
}