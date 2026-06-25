from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from models.predictor import predict_match
from services.cricket_api import get_current_matches
from services.cricket_service import get_team_recent_form
from services.analytics import analyze_match

app = FastAPI(title="CricIntel AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MatchInput(BaseModel):
    team1: str
    team2: str
    form1: int
    form2: int


@app.get("/")
def root():
    return {
        "message": "CricIntel AI Backend Running"
    }


@app.get("/live-matches")
async def live_matches():
    return await get_current_matches()

@app.get("/team/{team}")
async def team(team: str):
    return await get_team_recent_form(team)

@app.get("/analytics/{match_id}")
async def analytics(match_id: str):

    matches = await get_current_matches()

    for match in matches["data"]:

        if match["id"] == match_id:

            return analyze_match(match)

    return {
        "error": "Match not found"
    }

@app.post("/predict")
def predict(data: MatchInput):
    return predict_match(
        data.team1,
        data.team2,
        data.form1,
        data.form2
    )