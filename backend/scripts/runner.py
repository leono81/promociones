from scripts.galicia import fetch_galicia_promos
from scripts.frances import fetch_frances_promos
from scripts.naranja import fetch_naranja_promos
from datetime import datetime
from pathlib import Path
import json

def run_all_scripts():
    print("[Runner] Ejecutando recolección de promociones...")

    all_promotions = {}

    try:
        promos_galicia = fetch_galicia_promos()
        all_promotions["banco_galicia"] = promos_galicia
    except Exception as e:
        print(f"[Runner] Error en banco_galicia: {e}")
        all_promotions["banco_galicia"] = []

    try:
        promos_frances = fetch_frances_promos()
        all_promotions["banco_frances"] = promos_frances
    except Exception as e:
        print(f"[Runner] Error en banco_frances: {e}")
        all_promotions["banco_frances"] = []

    try:
        promos_naranja = fetch_naranja_promos()
        all_promotions["naranja"] = promos_naranja
    except Exception as e:
        print(f"[Runner] Error en naranja: {e}")
        all_promotions["naranja"] = []

    total_promos = sum(len(promos) for promos in all_promotions.values())
    print(f"[Runner] Total de promociones recolectadas: {total_promos}")

# Guardar todas las promociones en un solo archivo JSON
    try:
        fecha_actual = datetime.now().strftime("%d%m%Y")
        output_dir = Path("../backend/scripts/output")
        output_dir.mkdir(parents=True, exist_ok=True)
        nombre_archivo = output_dir / f"promociones_combinadas_{fecha_actual}.json"

        with open(nombre_archivo, "w", encoding="utf-8") as file:
            json.dump(all_promotions, file, ensure_ascii=False, indent=4)

        print(f"[Runner] Promociones combinadas guardadas en '{nombre_archivo}'")
    except Exception as e:
        print(f"[Runner] Error al guardar el archivo combinado: {e}")

