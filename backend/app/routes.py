import json
from pathlib import Path
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


@router.get("/categorias")
def get_categorias():
    try:
        # Ruta del archivo JSON
        path = Path("../backend/scripts/output/promociones_normalizadas.json")

        # Leer el archivo JSON
        with open(path, "r", encoding="utf-8") as file:
            promociones = json.load(file)

        # Extraer categorías únicas
        categorias = set()
        for promo in promociones:
            categorias.update(promo.get("categorias", []))  # Añadir categorías de cada promoción

        # Convertir el set a una lista ordenada
        categorias_unicas = sorted(list(categorias))

        return {"categorias": categorias_unicas}
    except Exception as e:
        return {"error": f"Error al procesar las categorías: {str(e)}"}



@router.post("/run-scripts")
def run_scripts():
    run_all_scripts()
    return {"message": "Todos los scripts se ejecutaron correctamente."}
