export default function Hero() {
  return (
    <section className="py-24 text-center">

      <div className="inline-flex px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-semibold mb-8">

        🚀 Powered by Machine Learning + FastAPI

      </div>

      <h1 className="text-7xl md:text-8xl font-black">

        Cricket

        <span className="text-blue-500">
          Intelligence
        </span>

      </h1>

      <p className="text-slate-400 text-xl mt-8 max-w-3xl mx-auto">

        Real-Time Cricket Analytics Platform combining Live Match Data,
        Machine Learning Predictions and AI-powered Match Insights.

      </p>

      <div className="flex justify-center gap-5 mt-12">

        <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-bold text-lg">

          Predict Match

        </button>

        <button className="border border-slate-700 hover:border-blue-500 px-8 py-4 rounded-2xl font-bold">

          Live Matches

        </button>

      </div>

    </section>
  );
}