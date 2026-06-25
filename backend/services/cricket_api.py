import os
import httpx
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("CRICKET_API_KEY")

BASE_URL = "https://api.cricapi.com/v1"


async def get_current_matches():
    async with httpx.AsyncClient(timeout=20) as client:

        url = f"{BASE_URL}/currentMatches"

        params = {
            "apikey": API_KEY,
            "offset": 0
        }

        print("API KEY:", API_KEY)
        print("REQUEST URL:", url)
        print("PARAMS:", params)

        response = await client.get(url, params=params)

        print("STATUS:", response.status_code)
        print("BODY:", response.text)

        return response.json()