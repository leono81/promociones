import requests
import json
from datetime import datetime

# URL del endpoint del Banco Francés (BBVA)
url = "https://go.bbva.com.ar/willgo/fgo/API/v3/communications"
params = {
    "pager": 0,  # Página inicial
    "provincias": 23  # Código de la provincia (Tierra del Fuego)
}

# Headers para simular un navegador
headers = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/113.0.0.0 Safari/537.36"
    ),
    "Accept": "application/json"
}

# Lista para almacenar todos los resultados
todos_los_datos = []
max_paginas = 10  # Límite máximo de páginas para evitar ciclos infinitos
pagina_actual = 0
datos_previos = None

# Ciclo para paginar
while pagina_actual < max_paginas:
    print(f"Solicitando datos para la página: {params['pager']}")  # Log de la página actual
    
    # Realizar la solicitud HTTP al endpoint con los parámetros
    response = requests.get(url, headers=headers, params=params)

    # Verificar si la solicitud fue exitosa
    if response.status_code == 200:
        # Extraer el JSON de la respuesta
        response_data = response.json()
        
        # Verificar si hay datos en la respuesta
        if not response_data.get("data"):
            print("No hay más datos disponibles en las siguientes páginas. Finalizando ciclo.")
            break

        # Verificar si los datos actuales son iguales a los de la página anterior
        if response_data == datos_previos:
            print("Los datos de la página actual son idénticos a los de la anterior. Finalizando ciclo.")
            break
        
        # Agregar los datos de la página actual a la lista de todos los datos
        todos_los_datos.extend(response_data["data"])
        print(f"Datos obtenidos para la página {params['pager']}: {len(response_data['data'])} registros")  # Log del número de registros

        # Guardar los datos actuales para comparar en la próxima iteración
        datos_previos = response_data

        # Incrementar el parámetro de página para la siguiente solicitud
        params["pager"] += 1
        pagina_actual += 1
    else:
        print(f"Error al obtener la página {params['pager']}: {response.status_code}")
        break

# Guardar los datos obtenidos en un archivo JSON
if todos_los_datos:
    # Obtener la fecha actual en formato DDMMYYYY
    fecha_actual = datetime.now().strftime("%d%m%Y")
    
    # Nombre del archivo con la fecha
    nombre_archivo = f"promociones_bbva_{fecha_actual}.json"
    
    # Guardar el JSON en un archivo
    with open(nombre_archivo, "w") as file:
        json.dump(todos_los_datos, file, indent=4)
    
    print(f"Todos los datos guardados en '{nombre_archivo}'")
else:
    print("No se encontraron datos para guardar.")
