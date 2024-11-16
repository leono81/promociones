import requests
import json
from datetime import datetime

# URL de la página principal de Naranja para obtener las cookies
url_principal = "https://www.naranjax.com/"
# URL del endpoint de la API de promociones
url_api = "https://bkn-promotions.naranjax.com/bff-promotions-web/api/binder/filter"

# Iniciar una sesión de requests para manejar las cookies automáticamente
session = requests.Session()

# Headers comunes para simular un navegador
headers = {
    "User-Agent": (
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/131.0.0.0 Safari/537.36"
    ),
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "es-US,es-419;q=0.9,es;q=0.8",
    "Content-Type": "application/json",
    "Origin": "https://www.naranjax.com",
    "Referer": "https://www.naranjax.com/",
}

# Realizar una solicitud inicial a la página principal para obtener las cookies necesarias
session.get(url_principal, headers=headers)

# Parámetros iniciales para el payload
payload = {
    "filters": {
        "geoposition": {
            "latitude": "-53.7860374",  # Coordenadas de ejemplo
            "longitude": "-67.7002243",
            "zoom": "30km"
        }
    },
    "pageOptions": {
        "page": 1,
        "size": 20  # Tamaño de página
    },
    "searchMode": "default"
}

# Lista para almacenar todos los resultados
todos_los_datos = []
max_paginas = 50  # Límite máximo de páginas para evitar ciclos infinitos
pagina_actual = 1

# Ciclo para obtener todas las páginas
while pagina_actual <= max_paginas:
    print(f"Solicitando datos para la página: {pagina_actual}")  # Log de la página actual
    
    # Actualizar el número de página en el payload
    payload["pageOptions"]["page"] = pagina_actual
    
    # Realizar la solicitud POST a la API con las cookies de sesión
    response = session.post(url_api, headers=headers, json=payload)
    
    # Verificar si la solicitud fue exitosa
    if response.status_code == 200:
        # Extraer el JSON de la respuesta
        response_data = response.json()
        
        # Verificar si hay datos en la respuesta
        if not response_data.get("data"):
            print("No hay más datos disponibles en las siguientes páginas. Finalizando ciclo.")
            break
        
        # Agregar los datos de la página actual a la lista de todos los datos
        todos_los_datos.extend(response_data["data"])
        print(f"Datos obtenidos para la página {pagina_actual}: {len(response_data['data'])} registros")
        
        # Verificar si llegamos al total de elementos en la página
        if len(response_data["data"]) < payload["pageOptions"]["size"]:
            print("Última página de datos alcanzada. Finalizando ciclo.")
            break
        
        # Incrementar el número de página para la siguiente iteración
        pagina_actual += 1
    else:
        print(f"Error al obtener la página {pagina_actual}: {response.status_code}")
        break

# Guardar los datos obtenidos en un archivo JSON
if todos_los_datos:
    # Obtener la fecha actual en formato DDMMYYYY
    fecha_actual = datetime.now().strftime("%d%m%Y")
    
    # Nombre del archivo con la fecha
    nombre_archivo = f"promociones_naranja_{fecha_actual}.json"
    
    # Guardar el JSON en un archivo
    with open(nombre_archivo, "w") as file:
        json.dump(todos_los_datos, file, indent=4)
    
    print(f"Todos los datos guardados en '{nombre_archivo}'")
else:
    print("No se encontraron datos para guardar.")
