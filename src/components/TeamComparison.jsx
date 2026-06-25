export default function TeamComparison({ prediction }) {

  if (!prediction) return null;

  const winner = prediction.winner;

  const teamA = prediction.teamA;
  const teamB = prediction.teamB;

  return (

    <section className="mt-12">

      <h1 className="text-4xl font-black mb-8">

        📊 Team Comparison

      </h1>

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8">

          <h2 className="text-3xl font-black">

            {teamA}

          </h2>

          <div className="space-y-5 mt-8">

            <Stat
              title="Batting"
              value={winner===teamA?92:82}
            />

            <Stat
              title="Bowling"
              value={winner===teamA?88:80}
            />

            <Stat
              title="Fielding"
              value={winner===teamA?90:84}
            />

            <Stat
              title="Momentum"
              value={winner===teamA?94:78}
            />

          </div>

        </div>

        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8">

          <h2 className="text-3xl font-black">

            {teamB}

          </h2>

          <div className="space-y-5 mt-8">

            <Stat
              title="Batting"
              value={winner===teamB?92:82}
            />

            <Stat
              title="Bowling"
              value={winner===teamB?88:80}
            />

            <Stat
              title="Fielding"
              value={winner===teamB?90:84}
            />

            <Stat
              title="Momentum"
              value={winner===teamB?94:78}
            />

          </div>

        </div>

      </div>

    </section>

  )

}

function Stat({title,value}){

return(

<div>

<div className="flex justify-between mb-2">

<span>{title}</span>

<span className="font-bold">

{value}

</span>

</div>

<div className="w-full h-4 rounded-full bg-slate-700">

<div

className="h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600"

style={{

width:`${value}%`

}}

></div>

</div>

</div>

)

}