import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import pickle

# Load dataset
df = pd.read_csv("../data/ipl_forms.csv")

# Encode teams
team_encoder = LabelEncoder()

all_teams = pd.concat([
    df["team1"],
    df["team2"]
]).unique()

team_encoder.fit(all_teams)

df["team1"] = team_encoder.transform(df["team1"])
df["team2"] = team_encoder.transform(df["team2"])

# Winner encoding
winner = []

for _, row in df.iterrows():
    if row["winner"] == team_encoder.inverse_transform([row["team1"]])[0]:
        winner.append(1)
    else:
        winner.append(0)

X = df[["team1", "team2", "t1Form", "t2Form"]]
y = winner

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

model.fit(X, y)

with open("ipl_model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("team_encoder.pkl", "wb") as f:
    pickle.dump(team_encoder, f)

print("Model trained successfully!")