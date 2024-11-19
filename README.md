# Promociones Web App

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

Promociones Web App es una aplicación web que recopila y muestra promociones de diferentes bancos en un diseño moderno, responsivo y fácil de usar. Los usuarios pueden buscar, filtrar y ordenar promociones según sus intereses y agregar eventos a su Google Calendar para no olvidar las ofertas.

---

## 🛠️ Tecnologías Utilizadas

### Frontend:
- **React**: Biblioteca para construir interfaces de usuario.
- **Tailwind CSS**: Framework CSS para estilos rápidos y modernos.
- **Axios**: Cliente HTTP para consumir la API.
- **Heroicons**: Íconos SVG predefinidos.

### Backend:
- **FastAPI**: Framework para construir la API que alimenta esta aplicación.
- **Render**: Servicio para alojar el backend con soporte HTTPS.

### Deploy:
- **Cloudflare Pages**: Hosting para el frontend con CI/CD automatizado.

---

## 🚀 Funcionalidades Principales

1. **Visualización de Promociones**:
   - Muestra tarjetas de promociones con detalles como nombre del comercio, descripción y días de aplicación.
   - Colores distintivos para cada banco.

2. **Filtros Dinámicos**:
   - Filtrado por banco, categoría y día de aplicación.
   - Buscador integrado en los filtros para una experiencia más intuitiva.
   - Chips visuales para mostrar filtros activos, con la opción de eliminarlos fácilmente.

3. **Ordenamiento**:
   - Posibilidad de ordenar las promociones de forma ascendente o descendente por nombre.

4. **Vista Detallada**:
   - Información ampliada sobre cada promoción en un diseño de overlay.
   - Botón para agregar la promoción a Google Calendar.
   - Enlace directo a la página oficial de promociones del banco correspondiente.

5. **Página de Carga**:
   - Animación mientras el backend responde, con frases dinámicas para una mejor experiencia de usuario.

---

## 📂 Estructura del Proyecto

```plaintext
promociones/
├── backend/                # Backend FastAPI (repositorio separado)
├── frontend/               # Frontend React
│   ├── public/             # Archivos públicos (favicon, index.html)
│   ├── src/                # Código fuente del frontend
│   │   ├── components/     # Componentes reutilizables (Filtros, Tarjetas)
│   │   ├── pages/          # Páginas principales
│   │   ├── services/       # Lógica para consumir la API
│   │   ├── utils/          # Utilidades como Google Calendar API
│   └── package.json        # Dependencias y scripts del proyecto
```


---

## 🛠️ Cómo Ejecutar Localmente

### Requisitos Previos:
- Node.js y npm instalados.
- Python 3.10 o superior para el backend.

### Clonar el Repositorio
```bash
git clone https://github.com/tu_usuario/promociones.git
cd promociones/frontend
```

### Instalar Dependencias
```bash
npm install
```

### Configurar Variables de Entorno
Crea un archivo .env en el directorio frontend/ con el contenido:
```plaintext
REACT_APP_API_URL=http://127.0.0.1:8000
```

### Iniciar el Frontend
```bash
npm start
```
### Iniciar el Backend
Sigue las instrucciones de configuración del backend en su propio repositorio.

### Roadmap
- Agregar mas bancos o medios de oferta.
   - Modo
   - YPF
   - Banco Macro
   - Banco Santander
   - Banco Tierra del Fuego
   - Banco Nación
- Mejorar UX/UI de la interfaz.
   - Que las tarjetas lleven a la promocion de la pagina oficial de la prmo
   - Lavado de cara a la interfaz.

## 🌐 URL de Producción
La aplicación está disponible en:
https://promociones.pages.dev

## 🤝 Contribuciones
¡Las contribuciones son bienvenidas! Por favor, abre un Issue o envía un Pull Request para mejoras.

## 📝 Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

## 👨‍💻 Autor
Leandro


¡Gracias por visitar este repositorio! 🌟


### **Pasos para Usarlo**:
1. Pega este contenido directamente debajo de la sección de "Estructura del Proyecto" en tu archivo `README.md`.
2. Actualiza los enlaces de **GitHub** y **LinkedIn** para reflejar tus datos personales.

Si necesitas algo más, ¡házmelo saber! 🚀
