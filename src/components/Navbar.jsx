export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-slate-950/80 border-b border-slate-800">

      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

        <h1 className="text-3xl font-black tracking-tight">
          Cric<span className="text-blue-500">Intel</span> AI
        </h1>

        <div className="flex gap-8">

          <button className="text-slate-400 hover:text-white transition">
            Dashboard
          </button>

          <button className="text-slate-400 hover:text-white transition">
            Predictor
          </button>

          <button className="text-slate-400 hover:text-white transition">
            Analytics
          </button>

        </div>

      </div>

    </nav>
  );
}