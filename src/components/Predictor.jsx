import { useState } from "react";
import axios from "axios";
import PredictionResult from "./PredictionResult";

const teams = [
  "Chennai Super Kings",
  "Mumbai Indians",
  "Royal Challengers Bangalore",
  "Kolkata Knight Riders",
  "Sunrisers Hyderabad",
  "Delhi Capitals",
  "Punjab Kings",
  "Rajasthan Royals",
];

export default function Predictor() {
  const [teamA, setTeamA] = useState(teams[0]);
  const [teamB, setTeamB] = useState(teams[1]);

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  async function predict() {
    if (teamA === teamB) {
      alert("Choose two different teams.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", {
        team1: teamA,
        team2: teamB,
        form1: 5,
        form2: 5,
      });

      setPrediction({
        ...res.data,
        teamA,
        teamB,
      });

    } catch (err) {
      console.error(err);
      alert("Prediction Failed");
    }

    setLoading(false);
  }

  return (
    <section className="pb-24">

      <div className="mb-10">

        <h1 className="text-5xl font-black">
          🤖 AI Match Predictor
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Compare teams using our Machine Learning prediction engine.
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <p className="text-slate-400 mb-3">
            Team A
          </p>

          <select
            value={teamA}
            onChange={(e)=>setTeamA(e.target.value)}
            className="w-full bg-slate-800 p-5 rounded-2xl"
          >
            {teams.map(team=>(
              <option key={team}>{team}</option>
            ))}
          </select>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <p className="text-slate-400 mb-3">
            Team B
          </p>

          <select
            value={teamB}
            onChange={(e)=>setTeamB(e.target.value)}
            className="w-full bg-slate-800 p-5 rounded-2xl"
          >
            {teams.map(team=>(
              <option key={team}>{team}</option>
            ))}
          </select>

        </div>

      </div>

      <div className="flex justify-center mt-10">

        <button
          onClick={predict}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition px-10 py-4 rounded-2xl font-black text-xl"
        >
          {loading ? "Running AI..." : "Predict Match"}
        </button>

      </div>

      <PredictionResult prediction={prediction} />

    </section>
  );
}