import requests

def fetch_naranja_promos():
    url_api = "https://bkn-promotions.naranjax.com/bff-promotions-web/api/binder/filter"
    headers = {
        "accept": "application/json, text/plain, */*",
        "accept-encoding": "gzip, deflate",
        "accept-language": "es-US,es-419;q=0.9,es;q=0.8",
        "content-type": "application/json",
        "origin": "https://www.naranjax.com",
        "referer": "https://www.naranjax.com/",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
    }
    payload = {
        "filters": {
            "geoposition": {
                "latitude": "-53.7821184",
                "longitude": "-67.7052416",
                "zoom": "30km"
            }
        },
        "pageOptions": {
            "page": 1,
            "size": 20
        },
        "searchMode": "default"
    }

    try:
        print("[NARANJA] Realizando solicitud al endpoint...")
        all_data = []
        while True:
            response = requests.post(url_api, headers=headers, json=payload)
            if response.status_code == 200:
                data = response.json()
                promociones = data.get("data", [])
                if not promociones:
                    break
                all_data.extend(promociones)
                total_items = data["info"]["total"]
                current_page = payload["pageOptions"]["page"]
                items_per_page = data["info"]["itemsByPage"]
                if current_page * items_per_page >= total_items:
                    break
                payload["pageOptions"]["page"] += 1
            else:
                print(f"[NARANJA] Error en la solicitud: {response.status_code}")
                break
        print(f"[NARANJA] Se encontraron {len(all_data)} promociones.")
        return all_data

    except Exception as e:
        print(f"[NARANJA] Excepción durante la solicitud: {e}")
        return []
