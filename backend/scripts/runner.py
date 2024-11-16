from scripts.galicia import fetch_galicia_promos
from scripts.frances import fetch_frances_promos
from scripts.naranja import fetch_naranja_promos
from pathlib import Path
import json
import re  # Para manejo de expresiones regulares


def normalize_data_galicia(raw_data):
    normalized = []
    for item in raw_data:
        try:
            normalized.append({
                "id": str(item.get("id", "")),
                "banco": "Banco Galicia",
                "titulo": item.get("titulo", ""),
                "subtitulo": item.get("subtitulo", ""),
                "promocion": item.get("promocion", ""),
                "imagen": item.get("imagen", ""),
                "categorias": ["Indumentaria"],  # Por ahora estático
                "dias_aplicacion": [item.get("leyendaDiasAplicacion", "")],
                "vigencia": {
                    "desde": None,
                    "hasta": None
                },
                "medios_pago": [
                    {"tarjeta": m.get("tarjeta", ""), "tipo_tarjeta": m.get("tipoTarjeta", "")}
                    for m in item.get("mediosDePago", [])
                ],
                "modeloAtencion": "Eminent" if item.get("eminent", False) else "Masivo",
                "pagoQR": item.get("pagoQR", False),
                "pagoNFC": item.get("pagoNFC", False),
                "cuotas": "cuotas" in item.get("promocion", "").lower(),
                "ahorro": "ahorro" in item.get("promocion", "").lower(),
                "tope_reintegro": None,
                "frecuencia_reintegro": None,
                "tipo_tope": None,
                "tipo_promocion": item.get("tipoPromocion", "")
            })
        except Exception as e:
            print(f"[Normalizer Galicia] Error al normalizar una promoción: {e}")
    return normalized


def normalize_data_frances(raw_data):
    normalized = []
    for item in raw_data:
        try:
            # Extraer beneficios principales
            beneficios = item.get("beneficios", [{}])[0]

            # Extraer requisitos como promoción
            promocion = beneficios.get("requisitos", [""])[0]

            # Extraer medios de pago desde requisitos
            medios_pago = []
            if promocion:
                tarjeta_matches = re.findall(r"(?i)tarjeta[s]? de crédito (\w+)", promocion)
                medios_pago = [{"tarjeta": f"Tarjeta {m}", "tipo_tarjeta": "Credito"} for m in tarjeta_matches]

            # Crear estructura normalizada
            normalized.append({
                "id": str(item.get("id", "")),
                "banco": "Banco Francés",
                "titulo": item.get("titulo", ""),
                "subtitulo": ", ".join([rubro.get("nombre", "") for rubro in item.get("rubros", [])]),
                "promocion": promocion,
                "imagen": item.get("imagen", ""),
                "categorias": [rubro.get("nombre", "") for rubro in item.get("rubros", [])],
                "dias_aplicacion": parse_days(item.get("diasPromo", "")),
                "vigencia": {
                    "desde": beneficios.get("cuando", "").split(" ")[1] if beneficios.get("cuando") else item.get("fechaVigenciaDesde"),
                    "hasta": beneficios.get("cuando", "").split(" ")[-1] if beneficios.get("cuando") else item.get("fechaVigenciaHasta"),
                },
                "medios_pago": medios_pago,
                "cuotas": beneficios.get("cuota", 0) != 0,
                "ahorro": beneficios.get("valor", 0) != 0,
                "tope_reintegro": beneficios.get("tope", 0),
                "frecuencia_reintegro": beneficios.get("frecuencia", ""),
                "tipo_tope": beneficios.get("tipoTope", ""),
                "pagoQR": False,  # No se menciona, asumimos False
                "pagoNFC": False,  # No se menciona, asumimos False
                "tipo_promocion": beneficios.get("claseDeBeneficio", "")
            })
        except Exception as e:
            print(f"[Normalizer Frances] Error al normalizar una promoción: {e}")
    return normalized


def normalize_data_naranja(raw_data):
    normalized = []
    days_map = {
        "lunes": "Lunes",
        "martes": "Martes",
        "miércoles": "Miércoles",
        "jueves": "Jueves",
        "viernes": "Viernes",
        "sábado": "Sábado",
        "domingo": "Domingo"
    }

    for item in raw_data:
        try:
            # Preparar días de aplicación
            dias_aplicacion = []
            if item.get("tags", []):
                for tag in item["tags"]:
                    description = tag.get("description", "").lower()
                    if "todos los dias" in description:
                        dias_aplicacion = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
                        break
                    elif "días seleccionados" in description:
                        dias_aplicacion.append("Consultar dia en la Web")
                    else:
                        # Extraer días específicos del texto
                        for word in days_map:
                            if word in description:
                                dias_aplicacion.append(days_map[word])

            # Evitar duplicados en los días
            dias_aplicacion = list(set(dias_aplicacion))

            # Detectar medios de pago y cuotas
            medios_pago = []
            promocion = item.get("title", "").lower()

            if "plan zeta" in promocion:
                medios_pago.append({
                    "tarjeta": "Naranja Plan Z",
                    "tipo_tarjeta": "Credito"
                })
                cuotas = True
            else:
                cuotas = "cuotas" in promocion

            if cuotas:
                medios_pago.append({
                    "tarjeta": "Tarjeta Credito Naranja",
                    "tipo_tarjeta": "Credito"
                })

            # Crear estructura normalizada
            normalized.append({
                "id": item.get("id", ""),
                "banco": "Tarjeta Naranja",
                "titulo": item.get("commerceName", ""),
                "subtitulo": item.get("subtitle", ""),
                "promocion": item.get("title", ""),
                "imagen": item.get("logo", ""),
                "categorias": [
                    item.get("category", {}).get("title", ""),
                    item.get("category", {}).get("subcategory", {}).get("title", "")
                ],
                "dias_aplicacion": dias_aplicacion,
                "vigencia": {
                    "desde": None,
                    "hasta": None
                },
                "medios_pago": medios_pago,
                "cuotas": cuotas,
                "ahorro": "off" in promocion,
                "tope_reintegro": 0,  # No especificado en Naranja
                "frecuencia_reintegro": "",
                "tipo_tope": "",
                "pagoQR": False,  # No especificado en Naranja
                "pagoNFC": False,  # No especificado en Naranja
                "tipo_promocion": ""
            })
        except Exception as e:
            print(f"[Normalizer Naranja] Error al normalizar una promoción: {e}")
    return normalized




def parse_days(diasPromo):
    days_map = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    if isinstance(diasPromo, str):
        return [days_map[i] for i, value in enumerate(diasPromo.split(",")) if value == "1"]
    return []


def run_all_scripts():
    print("[Runner] Ejecutando recolección de promociones...")

    all_promotions = []

    try:
        promos_galicia = fetch_galicia_promos()
        all_promotions.extend(normalize_data_galicia(promos_galicia))
    except Exception as e:
        print(f"[Runner] Error en banco_galicia: {e}")

    try:
        promos_frances = fetch_frances_promos()
        all_promotions.extend(normalize_data_frances(promos_frances))
    except Exception as e:
        print(f"[Runner] Error en banco_frances: {e}")

    try:
        promos_naranja = fetch_naranja_promos()
        all_promotions.extend(normalize_data_naranja(promos_naranja))
    except Exception as e:
        print(f"[Runner] Error en naranja: {e}")

    total_promos = len(all_promotions)
    print(f"[Runner] Total de promociones recolectadas: {total_promos}")

    # Guardar todas las promociones normalizadas en un archivo JSON
    try:
        output_dir = Path("../backend/scripts/output")
        output_dir.mkdir(parents=True, exist_ok=True)
        nombre_archivo = output_dir / f"promociones_normalizadas.json"

        with open(nombre_archivo, "w", encoding="utf-8") as file:
            json.dump(all_promotions, file, ensure_ascii=False, indent=4)

        print(f"[Runner] Promociones normalizadas guardadas en '{nombre_archivo}'")
    except Exception as e:
        print(f"[Runner] Error al guardar el archivo combinado: {e}")
