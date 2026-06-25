export default function Stats() {
  const stats = [
    {
      title: "AI Predictions",
      value: "12K+",
      icon: "🤖",
      color: "text-cyan-400",
    },
    {
      title: "Prediction Accuracy",
      value: "91.8%",
      icon: "🎯",
      color: "text-green-400",
    },
    {
      title: "Live Matches",
      value: "24/7",
      icon: "🏏",
      color: "text-orange-400",
    },
    {
      title: "Teams Tracked",
      value: "250+",
      icon: "📊",
      color: "text-purple-400",
    },
  ];

  return (
    <section className="mb-20">

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((card) => (

          <div
            key={card.title}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-8 hover:border-blue-500 transition hover:-translate-y-2"
          >

            <div className="text-4xl">
              {card.icon}
            </div>

            <h2 className={`text-5xl font-black mt-6 ${card.color}`}>
              {card.value}
            </h2>

            <p className="text-slate-400 mt-3">
              {card.title}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}