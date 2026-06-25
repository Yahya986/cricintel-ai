import TeamComparison from "./TeamComparison";

export default function PredictionResult({ prediction }) {
  if (!prediction) return null;

  const confidence = Number(prediction.confidence);

  function getVerdict() {
    if (confidence >= 85) return "Very Strong Favorite";
    if (confidence >= 70) return "Strong Favorite";
    if (confidence >= 55) return "Slight Favorite";
    return "Highly Competitive";
  }

  return (
    <>
      <section className="mt-14">

        <div className="rounded-[35px] overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 shadow-2xl">

          <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 p-8">

            <h2 className="text-4xl font-black text-white">
              🤖 AI Match Prediction
            </h2>

            <p className="text-blue-100 mt-2">
              Powered by CricIntel AI Prediction Engine
            </p>

          </div>

          <div className="p-10">

            <div className="grid lg:grid-cols-3 gap-6">

              <div className="rounded-3xl bg-slate-800/70 p-8 border border-slate-700">

                <p className="text-slate-400 uppercase text-sm">
                  Predicted Winner
                </p>

                <h1 className="text-4xl font-black text-green-400 mt-4">
                  🏆 {prediction.winner}
                </h1>

              </div>

              <div className="rounded-3xl bg-slate-800/70 p-8 border border-slate-700">

                <p className="text-slate-400 uppercase text-sm">
                  Confidence
                </p>

                <h1 className="text-5xl font-black text-cyan-400 mt-4">
                  {confidence}%
                </h1>

              </div>

              <div className="rounded-3xl bg-slate-800/70 p-8 border border-slate-700">

                <p className="text-slate-400 uppercase text-sm">
                  AI Verdict
                </p>

                <h1 className="text-3xl font-black text-orange-400 mt-4">
                  {getVerdict()}
                </h1>

              </div>

            </div>

            <div className="mt-12">

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Prediction Confidence
                </span>

                <span className="font-bold text-cyan-400">
                  {confidence}%
                </span>

              </div>

              <div className="w-full bg-slate-700 h-5 rounded-full overflow-hidden">

                <div
                  className="h-5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-700"
                  style={{
                    width: `${confidence}%`,
                  }}
                />

              </div>

            </div>

            <div className="grid lg:grid-cols-2 gap-8 mt-12">

              <div className="rounded-3xl bg-slate-800/60 border border-slate-700 p-8">

                <h2 className="text-2xl font-black mb-6">
                  📊 Prediction Summary
                </h2>

                <div className="space-y-5">

                  <Row title="Team A" value={prediction.teamA} />
                  <Row title="Team B" value={prediction.teamB} />
                  <Row title="Predicted Winner" value={prediction.winner} />
                  <Row title="Model Confidence" value={`${confidence}%`} />

                </div>

              </div>

              <div className="rounded-3xl bg-slate-800/60 border border-slate-700 p-8">

                <h2 className="text-2xl font-black mb-6">
                  🧠 AI Explanation
                </h2>

                <div className="space-y-5 text-slate-300">

                  <p>
                    This prediction is generated using the trained Random Forest
                    model deployed in the CricIntel AI backend.
                  </p>

                  <p>
                    The confidence value represents the probability assigned by
                    the model to the predicted winner.
                  </p>

                  <p>
                    Match analytics such as run rate, batting performance and
                    bowling performance can be explored directly from the Live
                    Matches section.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <TeamComparison prediction={prediction} />
    </>
  );
}

function Row({ title, value }) {
  return (
    <div className="flex justify-between">

      <span className="text-slate-400">
        {title}
      </span>

      <span className="font-bold">
        {value}
      </span>

    </div>
  );
}