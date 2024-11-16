from fastapi import APIRouter
from scripts.runner import run_all_scripts


router = APIRouter()

@router.get("/promociones")
def get_promociones():
    # Aquí cargamos los datos de los JSON
    from pathlib import Path
    import json

    output_dir = Path("../backend/scripts/output")
    promociones = []

    for file in output_dir.glob("*.json"):
        with open(file, "r") as f:
            promociones.extend(json.load(f))

    return {"data": promociones}

@router.post("/run-scripts")
def run_scripts():
    run_all_scripts()
    return {"message": "Todos los scripts se ejecutaron correctamente."}
