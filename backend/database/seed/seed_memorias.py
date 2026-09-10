from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "database", "quilombola.db")

def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS memorias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            comunidade TEXT NOT NULL,
            descricao TEXT,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL
        )
    """)
    conn.commit()
    conn.close()

init_db()

class Memoria(BaseModel):
    titulo: str
    comunidade: str
    descricao: str
    latitude: float
    longitude: float

@app.get("/api/memorias")
def get_memorias():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT id, titulo, comunidade, descricao, latitude, longitude FROM memorias")
    rows = cursor.fetchall()
    conn.close()
    return [
        {"id": r[0], "titulo": r[1], "comunidade": r[2], "descricao": r[3], "latitude": r[4], "longitude": r[5]}
        for r in rows
    ]

@app.post("/api/memorias")
def create_memoria(memoria: Memoria):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO memorias (titulo, comunidade, descricao, latitude, longitude) VALUES (?, ?, ?, ?, ?)",
        (memoria.titulo, memoria.comunidade, memoria.descricao, memoria.latitude, memoria.longitude)
    )
    conn.commit()
    conn.close()
    return {"status": "sucesso"}