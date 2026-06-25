from services.cricket_api import get_current_matches


async def get_team_recent_form(team_name: str):
    matches = await get_current_matches()

    recent_matches = []
    form = 0

    for match in matches.get("data", []):

        teams = match.get("teams", [])

        if team_name not in teams:
            continue

        status = match.get("status", "")

        won = (
            team_name.lower() in status.lower()
            and "won" in status.lower()
        )

        if won:
            form += 1

        recent_matches.append(
            {
                "id": match.get("id"),
                "name": match.get("name"),
                "date": match.get("date"),
                "status": status,
                "won": won,
            }
        )

    recent_matches = recent_matches[:5]

    return {
        "team": team_name,
        "form": form,
        "matchesPlayed": len(recent_matches),
        "matches": recent_matches,
    }