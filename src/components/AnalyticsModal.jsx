import { useEffect, useState } from "react";
import axios from "axios";

export default function AnalyticsModal({
  match,
  isOpen,
  onClose,
}) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen || !match) return;

    fetchAnalytics();
  }, [isOpen, match]);

  async function fetchAnalytics() {
    setLoading(true);
    setError("");
    setAnalytics(null);

    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/analytics/${match.id}`
      );

      if (res.data.error) {
        setError(res.data.error);
      } else {
        setAnalytics(res.data);
      }
    } catch (err) {
      setError("Unable to load analytics.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6">

      <div className="relative w-full max-w-5xl rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 p-8">

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-4xl font-black text-white">
                📊 Match Analytics
              </h1>

              <p className="text-blue-100 mt-2">
                Powered by CricIntel AI
              </p>

            </div>

            <button
              onClick={onClose}
              className="text-white text-4xl font-bold hover:scale-110 transition"
            >
              ×
            </button>

          </div>

        </div>

        <div className="p-8">

          {loading && (

            <div className="py-20 text-center text-xl">

              Loading Analytics...

            </div>

          )}

          {!loading && error && (

            <div className="rounded-2xl bg-red-500/10 border border-red-500 p-8 text-center text-red-300">

              {error}

            </div>

          )}

          {!loading && analytics && (

            <>
              <div className="grid lg:grid-cols-3 gap-6">

                <Card
                  title="Winner"
                  value={analytics.winner}
                  color="text-green-400"
                />

                <Card
                  title="Team 1 Run Rate"
                  value={analytics.runRateTeam1}
                  color="text-cyan-400"
                />

                <Card
                  title="Team 2 Run Rate"
                  value={analytics.runRateTeam2}
                  color="text-cyan-400"
                />

              </div>

              <div className="grid lg:grid-cols-2 gap-8 mt-10">

                <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8">

                  <h2 className="text-2xl font-black mb-8">
                    📈 Ratings
                  </h2>

                  <Progress
                    title="Batting Rating"
                    value={analytics.battingRating}
                  />

                  <Progress
                    title="Bowling Rating"
                    value={analytics.bowlingRating}
                  />

                  <Progress
                    title="Dominance Score"
                    value={analytics.dominanceScore}
                  />

                  <Progress
                    title="Efficiency"
                    value={analytics.efficiency}
                  />

                </div>

                <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8">

                  <h2 className="text-2xl font-black mb-8">
                    🤖 AI Verdict
                  </h2>

                  <div className="space-y-6">

                    <Insight
                      label="Winning Team"
                      value={analytics.winner}
                    />

                    <Insight
                      label={analytics.team1}
                      value={`${analytics.runRateTeam1} RR`}
                    />

                    <Insight
                      label={analytics.team2}
                      value={`${analytics.runRateTeam2} RR`}
                    />

                    <Insight
                      label="Batting Rating"
                      value={analytics.battingRating}
                    />

                    <Insight
                      label="Bowling Rating"
                      value={analytics.bowlingRating}
                    />

                    <Insight
                      label="Dominance"
                      value={`${analytics.dominanceScore}%`}
                    />

                    <Insight
                      label="Efficiency"
                      value={`${analytics.efficiency}%`}
                    />

                  </div>

                </div>

              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8">

      <p className="text-slate-400 uppercase text-sm">
        {title}
      </p>

      <h2 className={`text-4xl font-black mt-4 ${color}`}>
        {value}
      </h2>

    </div>
  );
}

function Progress({ title, value }) {
  return (
    <div className="mb-8">

      <div className="flex justify-between mb-2">

        <span>{title}</span>

        <span className="font-bold">
          {value}
        </span>

      </div>

      <div className="w-full h-5 rounded-full bg-slate-700 overflow-hidden">

        <div
          className="h-5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 transition-all duration-700"
          style={{
            width: `${Math.min(value,100)}%`,
          }}
        />

      </div>

    </div>
  );
}

function Insight({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b border-slate-800 pb-4">

      <span className="text-slate-400">
        {label}
      </span>

      <span className="font-bold text-cyan-400">
        {value}
      </span>

    </div>
  );
}