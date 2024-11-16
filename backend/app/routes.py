import json
from fastapi import APIRouter
from scripts.runner import run_all_scripts


router = APIRouter()

@router.get("/promociones")
def get_promociones():
    # Leer el archivo JSON con todas las promociones recolectadas
    try:
        with open("../backend/scripts/output/promociones_normalizadas.json", "r", encoding="utf-8") as file:
            promociones = file.read()
    except Exception as e:
        promociones = {"error": f"Error al leer el archivo: {e}"}

    # Convertir el contenido del archivo JSON a un diccionario
    try:
        promociones = json.loads(promociones)
    except Exception as e:
        promociones = {"error": f"Error al convertir el archivo JSON: {e}"}

    return promociones



@router.post("/run-scripts")
def run_scripts():
    run_all_scripts()
    return {"message": "Todos los scripts se ejecutaron correctamente."}
