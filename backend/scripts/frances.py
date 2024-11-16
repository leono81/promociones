import requests

def fetch_frances_promos():
    url = "https://go.bbva.com.ar/willgo/fgo/API/v3/communications"
    params = {
        "pager": 0,  # Página inicial
        "provincias": 23  # Código de la provincia (Tierra del Fuego)
    }
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/113.0.0.0 Safari/537.36"
        ),
        "Accept": "application/json"
    }

    all_promotions = []
    max_pages = 20  # Número máximo de páginas a solicitar
    current_page = 0 # Contador de páginas
    datos_previos = None

    while current_page < max_pages:
        print(f"[FRANCES] Realizando solicitud al endpoint... Página {params['pager']}")
        response = requests.get(url, headers=headers, params=params)
        if response.status_code == 200:
            print("[FRANCES] Solicitud exitosa. Procesando datos...")
            response_data = response.json()
            if not response_data.get("data"):
                break
            if response_data == datos_previos:
                print("[FRANCES] Se encontraron todos los datos disponibles.")
                break
            all_promotions.extend(response_data["data"])
            print(f"Datos obtenidos para la página {params['pager']}: {len(response_data['data'])} registros")  # Log del número de registros

            # Guardar los datos actuales para comparar en la próxima iteración
            datos_previos = response_data

            # Incrementar el parámetro de página para la siguiente solicitud
            params["pager"] += 1
            current_page += 1
        else:
            raise Exception(f"[FRANCES] Error en página {params['pager']}: {response.status_code}")
    return all_promotions  # Retorna la lista de promociones
