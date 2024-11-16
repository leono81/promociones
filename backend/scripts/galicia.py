import requests

def fetch_galicia_promos():
    # URL del endpoint con los filtros aplicados
    url = "https://loyalty.bff.bancogalicia.com.ar/api/portal/catalogo/v1/promociones"
    params = {
        "page": 1,
        "pageSize": 15,
        "Provincia": "TIERRA DEL FUEGO",
        "Localidad": "RIO GRANDE"
    }

    # Headers para simular un navegador
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/113.0.0.0 Safari/537.36"
        ),
        "Accept": "application/json"
    }

    try:
        print("[GALICIA] Realizando solicitud al endpoint...")
        response = requests.get(url, headers=headers, params=params)

        if response.status_code == 200:
            print("[GALICIA] Solicitud exitosa. Procesando datos...")
            response_data = response.json()

            # Acceder a las promociones dentro de "data" -> "list"
            promociones = response_data.get("data", {}).get("list", [])
            if not promociones:
                print("[GALICIA] No se encontraron promociones en la respuesta.")
            else:
                print(f"[GALICIA] Se encontraron {len(promociones)} promociones.")
            return promociones

        else:
            print(f"[GALICIA] Error en la solicitud: {response.status_code}")
            return []

    except Exception as e:
        print(f"[GALICIA] Excepción durante la solicitud: {e}")
        return []
