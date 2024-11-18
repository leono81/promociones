import React, { useState, useEffect } from "react";
import Filters from "./components/Filters";
import Card from "./components/Card";
import { getPromociones, getCategorias } from "./services/promotionService";

function App() {
  const [promociones, setPromociones] = useState([]);
  const [categorias, setCategorias] = useState([]); // Estado para las categorías
  const [filtroBanco, setFiltroBanco] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState([]);
  const [filtroDia, setFiltroDia] = useState([]);
  const [orden, setOrden] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar promociones
        const promocionesData = await getPromociones();
        setPromociones(promocionesData);

        // Cargar categorías
        const categoriasData = await getCategorias();
        setCategorias(categoriasData); // Ahora es un array directamente
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchData();
  }, []);

  const promocionesFiltradas = promociones
    .filter((promo) => {
      const coincideBanco = filtroBanco.length === 0 || filtroBanco.includes(promo.banco);
      const coincideCategoria =
        filtroCategoria.length === 0 || filtroCategoria.some((cat) => promo.categorias.includes(cat));
      const coincideDia =
        filtroDia.length === 0 || filtroDia.some((dia) => promo.dias_aplicacion.includes(dia));
      return coincideBanco && coincideCategoria && coincideDia;
    })
    .sort((a, b) => {
      if (orden === "asc") return a.titulo.localeCompare(b.titulo);
      if (orden === "desc") return b.titulo.localeCompare(a.titulo);
      return 0;
    });

  return (
    <div className="min-h-screen bg-neutral p-6">
      <h1 className="text-2xl font-bold text-dark mb-6 text-center">Promociones Disponibles</h1>
      <Filters
        setFiltroBanco={setFiltroBanco}
        setFiltroCategoria={setFiltroCategoria}
        setFiltroDia={setFiltroDia}
        setOrden={setOrden}
        categorias={categorias} // Pasamos las categorías como prop
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {promocionesFiltradas.map((promo) => (
          <Card
            key={promo.id}
            titulo={promo.titulo}
            subtitulo={promo.subtitulo}
            promocion={promo.promocion}
            categorias={promo.categorias}
            dias_aplicacion={promo.dias_aplicacion}
            banco={promo.banco}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
