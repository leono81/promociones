import React, { useState, useEffect } from "react";
import Filters from "./components/Filters";
import Card from "./components/Card";
import { getPromociones, getCategorias } from "./services/promotionService";
import PromotionDetails from "./components/PromotionDetails";
import LoadingPage from "./components/LoadingPage";

function App() {
  const [promociones, setPromociones] = useState([]);
  const [filtroBanco, setFiltroBanco] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState([]);
  const [filtroDia, setFiltroDia] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orden, setOrden] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const dataPromociones = await getPromociones();
        console.log("Promociones cargadas:", dataPromociones);
        setPromociones(dataPromociones);

        const dataCategorias = await getCategorias();
        console.log("Categorías cargadas:", dataCategorias);
        setCategorias(dataCategorias);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  const promocionesFiltradas = promociones.filter((promo) => {
    const coincideBanco =
      filtroBanco.length === 0 || filtroBanco.includes(promo.banco);
    const coincideCategoria =
      filtroCategoria.length === 0 ||
      promo.categorias.some((cat) => filtroCategoria.includes(cat));
    const coincideDia =
      filtroDia.length === 0 ||
      filtroDia.some((dia) => promo.dias_aplicacion.includes(dia));
    const coincideBusqueda =
      searchTerm === "" ||
      promo.titulo.toLowerCase().includes(searchTerm.toLowerCase());

    return coincideBanco && coincideCategoria && coincideDia && coincideBusqueda;
  });

  if (orden === "asc") {
    promocionesFiltradas.sort((a, b) => a.titulo.localeCompare(b.titulo));
  } else if (orden === "desc") {
    promocionesFiltradas.sort((a, b) => b.titulo.localeCompare(a.titulo));
  }

  const noFiltrosAplicados =
    filtroBanco.length === 0 &&
    filtroCategoria.length === 0 &&
    filtroDia.length === 0 &&
    searchTerm === "";

  return (
    <div className="p-4">
      <h1 className="text-center text-6xl font-black mb-6 flex items-center justify-center gap-4 text-green-500">
        PromoHub
      </h1>


      {/* Input de búsqueda */}
      <div className="flex flex-col gap-4 md:flex-row md:gap-6 items-center justify-center m-8">
        <input
          type="text"
          placeholder="Buscar Nombre del Comercio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm shadow-md"
        />
      </div>

      {/* Filtros */}
      <div>
        <Filters
          filtroBanco={filtroBanco}
          setFiltroBanco={setFiltroBanco}
          filtroCategoria={filtroCategoria}
          setFiltroCategoria={setFiltroCategoria}
          filtroDia={filtroDia}
          setFiltroDia={setFiltroDia}
          setOrden={setOrden}
          categorias={categorias}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Condicional para mostrar tarjetas o mensajes */}
      <div className="mt-4 flex flex-col items-center justify-center w-full">
        {noFiltrosAplicados ? (
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Usa los filtros o la barra de búsqueda para encontrar promociones.
            </p>
          </div>
        ) : promocionesFiltradas.length === 0 ? (
          <div className="text-center mt-8">
            <p className="text-gray-600">
              🦆 CUAK!! No hay promociones con los filtros elegidos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
            {promocionesFiltradas.map((promo) => (
              <Card
                key={promo.id}
                {...promo}
                onClick={() => setSelectedPromotion(promo)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detalle de promoción */}
      {selectedPromotion && (
        <PromotionDetails
          promotion={selectedPromotion}
          onClose={() => setSelectedPromotion(null)}
        />
      )}
    </div>
  );
}

export default App;
