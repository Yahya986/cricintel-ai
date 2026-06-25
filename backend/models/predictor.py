import pickle

with open("models/ipl_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("models/team_encoder.pkl", "rb") as f:
    encoder = pickle.load(f)

def predict_match(team1, team2, form1, form2):

    t1 = encoder.transform([team1])[0]
    t2 = encoder.transform([team2])[0]

    prediction = model.predict_proba([
        [t1, t2, form1, form2]
    ])[0]

    confidence = max(prediction)

    winner = team1 if prediction[1] > prediction[0] else team2

    return {
        "winner": winner,
        "confidence": round(confidence * 100, 2)
    }