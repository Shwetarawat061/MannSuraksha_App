# mannsuraksha_backend/main.py
from fastapi import FastAPI, Request
from pydantic import BaseModel
from datetime import datetime
import sqlite3
import random

app = FastAPI()

# ----- DATABASE SETUP -----
conn = sqlite3.connect("mansuraksha.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute('''CREATE TABLE IF NOT EXISTS mood_checkins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    input_type TEXT,
    content TEXT,
    mood TEXT,
    timestamp TEXT
)''')
conn.commit()

# ----- MODELS -----
class MoodCheckin(BaseModel):
    user_id: str
    input_type: str  # 'voice' or 'text'
    content: str

class ChatRequest(BaseModel):
    user_id: str
    message: str

# ----- MOCK EMOTION ANALYSIS (To be replaced with real model) -----
def analyze_mood(text: str) -> str:
    text = text.lower()
    if any(word in text for word in ["sad", "tired", "anxious", "stressed"]):
        return "stressed"
    elif any(word in text for word in ["happy", "excited", "great"]):
        return "happy"
    else:
        return "neutral"

# ----- ROUTES -----
@app.post("/mood/checkin")
def checkin_mood(data: MoodCheckin):
    mood = analyze_mood(data.content)
    timestamp = datetime.now().isoformat()
    cursor.execute("INSERT INTO mood_checkins (user_id, input_type, content, mood, timestamp) VALUES (?, ?, ?, ?, ?)",
                   (data.user_id, data.input_type, data.content, mood, timestamp))
    conn.commit()
    return {"status": "success", "detected_mood": mood, "timestamp": timestamp}

@app.get("/mood/history/{user_id}")
def get_mood_history(user_id: str):
    cursor.execute("SELECT content, mood, timestamp FROM mood_checkins WHERE user_id = ? ORDER BY timestamp DESC LIMIT 10", (user_id,))
    history = cursor.fetchall()
    return {"history": history}

@app.post("/chat")
def chatbot_response(request: ChatRequest):
    motivational_quotes = [
        "Take a deep breath — you're doing great.",
        "You’ve handled tough days before, you can do it again.",
        "One step at a time. You’ve got this!"
    ]
    response = random.choice(motivational_quotes)
    return {"response": response}

@app.get("/")
def root():
    return {"message": "MannSuraksha Backend API is running."}
