- # Proyecto: Sistema de Promociones Bancarias
- ## Objetivo del Proyecto
  Construir un sistema que permita recolectar y visualizar promociones de tres bancos: **Banco Galicia**, **Banco Francés (BBVA)** y **Naranja X**, con capacidad de filtrar y acceder a las promociones mediante una API y un frontend dinámico.  
- ## Estructura del Proyecto
	- ### 1. Backend
		- **Framework:** FastAPI.  
		  **Funciones principales:**  
			- Ejecutar los scripts de scraping de manera programada.
			- Exponer las promociones mediante endpoints RESTful.
			- Generar logs para monitoreo y debugging.
			-
		- **Scripts de scraping:**
			- **Banco Galicia:** Extrae promociones filtradas por provincia y localidad.
			- **Banco Francés (BBVA):** Recolecta promociones con paginación.
			- **Naranja X:** Utiliza coordenadas y paginación para obtener promociones.
		-
		- **Almacenamiento:**  
		  Promociones guardadas en formato JSON en un archivo consolidado (`promociones.json`), organizado por origen (banco).  
		- **Arranque del backend**
			-
			  ```bash
			  cd backend
			  
			  python3 -m venv env
			  
			  source env/bin/activate
			  
			  uvicorn app.main:app --reload
			  ```
		-
		-
	- ### 2. Frontend
		- **Framework (planeado):** React.
		- **Objetivos:**
			- Diseño responsivo y moderno.
			- Opciones de filtrado dinámico (por banco, categoría, ubicación, etc.).
			- Visualización amigable de las promociones.
	-
		- **Estado actual:**
			- En planeación; el backend está listo para integrarse con el frontend.
	- ### 3. Hosting
		- **Frontend:** Planeado para alojarse en **Cloudflare Pages**.
		- **Backend:**
			- Puede ejecutarse en un VPS o en un servidor casero con seguridad mejorada.
			- **Opcional:** Implementar un servicio gestionado como Render.
- ## Flujo de Trabajo
	- ### Recolección de Datos
		- 1. Los scripts se ejecutan para cada banco.
		- 2. Los resultados se consolidan en un archivo JSON único.
		- 3. Logs detallan errores o problemas en los scripts.
	- ### Exposición de Datos
		- FastAPI expone las promociones mediante endpoints RESTful:
			- `/run-scripts`: Ejecuta los scripts manualmente.
			- `/promociones`: Devuelve las promociones almacenadas en JSON.
	- ### Visualización de Datos (Planeado)
		- El frontend React consumirá la API del backend.
		- Permitirá búsquedas, filtros y visualizaciones atractivas.
-
- ## Componentes del Proyecto
  
  **Directorio:**  
	-
	  ```bash
	  promociones/
	  ├── backend/
	  │   ├── app/
	  │   │   ├── main.py        # Configuración principal de FastAPI
	  │   │   ├── routes.py      # Endpoints de la API
	  │   ├── scripts/
	  │   │   ├── galicia.py     # Scraper para Banco Galicia
	  │   │   ├── frances.py     # Scraper para Banco Francés (BBVA)
	  │   │   ├── naranja.py     # Scraper para Naranja X
	  │   │   ├── runner.py      # Coordinador de los scripts
	  ├── frontend/              # Planeado para React
	  ├── promociones.json       # Archivo consolidado de promociones
	  ```
-
- ## Próximos Pasos
- ### Frontend
- TODO Diseñar e implementar un frontend básico en React.
- TODO Crear filtros dinámicos (por banco, categoría, etc.).
- TODO Asegurar diseño responsivo.
- ### Programar Ejecución Automática
- TODO Configurar un cron job o scheduler para ejecutar `runner.py` semanalmente.
- ### Seguridad y Hosting
- TODO Definir el método de hosting (VPS o local con Proxmox).
- TODO Asegurar la API y los datos con HTTPS (Let's Encrypt).
- ### Optimización
- TODO Validar que los tiempos de respuesta sean óptimos.
- TODO Manejar grandes cantidades de datos eficientemente.
- ## Estado Actual
- **Backend:** Operativo y funcional.
- **Scraping:** Todos los scripts funcionan correctamente y están integrados.
- **Frontend:** Por desarrollar.
-