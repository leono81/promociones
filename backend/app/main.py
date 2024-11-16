from fastapi import FastAPI
from .routes import router

app = FastAPI()

# Registrar las rutas del proyecto
app.include_router(router)

@app.get("/")
def root():
    return {"message": "¡Bienvenido a la API de Promociones!"}
