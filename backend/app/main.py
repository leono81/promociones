from fastapi import FastAPI
from .routes import router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configurar orígenes permitidos
origins = [
    "http://localhost:3000",  # Frontend local
    "http://127.0.0.1:3000",  # Variación del frontend local
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permitir estos orígenes
    allow_credentials=True,  # Permitir envío de cookies/credenciales
    allow_methods=["*"],  # Permitir todos los métodos HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos los headers
)

# Registrar las rutas del proyecto
app.include_router(router)

@app.get("/")
def root():
    return {"message": "¡Bienvenido a la API de Promociones!"}
