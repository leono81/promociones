import requests
import json
from datetime import datetime

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

# Realizar la solicitud HTTP al endpoint con los parámetros
response = requests.get(url, headers=headers, params=params)

# Verificar si la solicitud fue exitosa
if response.status_code == 200:
    # Extraer el JSON de la respuesta
    response_data = response.json()
    
    # Obtener la fecha actual en formato DDMMYYYY
    fecha_actual = datetime.now().strftime("%d%m%Y")
    
    # Nombre del archivo con la fecha en formato DDMMYYYY
    nombre_archivo = f"promociones_galicia_{fecha_actual}.json"
    
    # Guardar el JSON en un archivo
    with open(nombre_archivo, "w") as file:
        json.dump(response_data, file, indent=4)
    
    print(f"Datos guardados en '{nombre_archivo}'")
else:
    print(f"Error al obtener la página: {response.status_code}")
