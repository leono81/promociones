import React, { useState, useEffect } from "react";
import Filters from "./components/Filters";
import Card from "./components/Card";
import PromotionDetail from "./components/PromotionDetail";
import { getPromociones } from "./services/promotionService";

function App() {
  const [promociones, setPromociones] = useState([]);
  const [filtroBanco, setFiltroBanco] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState([]);
  const [filtroDia, setFiltroDia] = useState([]);
  const [orden, setOrden] = useState(""); // Declarar el estado de orden
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  useEffect(() => {
    const fetchPromociones = async () => {
      try {
        const data = await getPromociones();
        setPromociones(data);
      } catch (error) {
        console.error("Error al cargar promociones:", error);
      }
    };

    fetchPromociones();
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
    return 0; // Sin orden, no altera el arreglo
  });


  return (
    <div className="min-h-screen bg-neutral p-6">
      <h1 className="text-2xl font-bold text-dark mb-6 text-center">
        Promociones Disponibles
      </h1>

      <Filters
        setFiltroBanco={setFiltroBanco}
        setFiltroCategoria={setFiltroCategoria}
        setFiltroDia={setFiltroDia}
        setOrden={setOrden}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {promocionesFiltradas.map((promo) => (
          <Card
            key={promo.id}
            {...promo}
            onClick={() => setSelectedPromotion(promo)}
          />
        ))}
      </div>

      {selectedPromotion && (
        <PromotionDetail
          promotion={selectedPromotion}
          onClose={() => setSelectedPromotion(null)}
        />
      )}
    </div>
  );
}

export default App;
