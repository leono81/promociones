import React, { useState, useEffect } from "react";
import Filters from "./components/Filters";
import Card from "./components/Card";
import { getPromociones, getCategorias } from "./services/promotionService";
import PromotionDetails from "./components/PromotionDetails";

function App() {
  const [promociones, setPromociones] = useState([]);
  const [filtroBanco, setFiltroBanco] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState([]);
  const [filtroDia, setFiltroDia] = useState([]);
  const [orden, setOrden] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null); // Estado para la promoción seleccionada

  useEffect(() => {
    async function fetchData() {
      try {
        const dataPromociones = await getPromociones();
        console.log("Promociones cargadas:", dataPromociones);
        setPromociones(dataPromociones);
  
        const dataCategorias = await getCategorias();
        console.log("Categorías cargadas:", dataCategorias);
        setCategorias(dataCategorias); // Verifica que esto es un array
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }
    fetchData();
  }, []);

  const promocionesFiltradas = promociones.filter((promo) => {
    const coincideBanco =
      filtroBanco.length === 0 || filtroBanco.includes(promo.banco);
    const coincideCategoria =
      filtroCategoria.length === 0 ||
      promo.categorias.some((cat) => filtroCategoria.includes(cat));
    const coincideDia =
      filtroDia.length === 0 || filtroDia.some((dia) => promo.dias_aplicacion.includes(dia));
    return coincideBanco && coincideCategoria && coincideDia;
  });

  if (orden === "asc") {
    promocionesFiltradas.sort((a, b) =>
      a.titulo.localeCompare(b.titulo)
    );
  } else if (orden === "desc") {
    promocionesFiltradas.sort((a, b) =>
      b.titulo.localeCompare(a.titulo)
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">
        Promociones Disponibles
      </h1>
      <Filters
        filtroBanco={filtroBanco}
        setFiltroBanco={setFiltroBanco}
        filtroCategoria={filtroCategoria}
        setFiltroCategoria={setFiltroCategoria}
        filtroDia={filtroDia}
        setFiltroDia={setFiltroDia}
        setOrden={setOrden}
        categorias={categorias}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {promocionesFiltradas.map((promo) => (
          <Card
            key={promo.id}
            {...promo}
            onClick={() => setSelectedPromotion(promo)} // Vincular el clic
          />
        ))}
      </div>
      {selectedPromotion && (
        <PromotionDetails
          promotion={selectedPromotion}
          onClose={() => setSelectedPromotion(null)} // Cerrar overlay
        />
      )}
    </div>
  );
}

export default App;
