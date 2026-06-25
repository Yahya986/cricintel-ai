def analyze_match(match):

    if len(match["score"]) < 2:
        return {
            "error": "Match not completed"
        }

    innings1 = match["score"][0]
    innings2 = match["score"][1]

    runs1 = innings1["r"]
    wickets1 = innings1["w"]
    overs1 = innings1["o"]

    runs2 = innings2["r"]
    wickets2 = innings2["w"]
    overs2 = innings2["o"]

    rr1 = round(runs1 / overs1, 2)
    rr2 = round(runs2 / overs2, 2)

    batting_rating = min(100, round(rr2 * 8.5))

    bowling_rating = max(
        40,
        round(100 - rr1 * 4)
    )

    dominance = round(
        (rr2 / rr1) * 100
    )

    efficiency = round(
        (runs2 / runs1) * 100
    )

    return {

        "winner": match["status"],

        "team1": match["teams"][0],

        "team2": match["teams"][1],

        "runRateTeam1": rr1,

        "runRateTeam2": rr2,

        "battingRating": batting_rating,

        "bowlingRating": bowling_rating,

        "dominanceScore": dominance,

        "efficiency": efficiency

    }