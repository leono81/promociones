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
  const [orden, setOrden] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");


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
      } finally {
        setIsLoading(false); // Oculta la pantalla de carga
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingPage />; // Muestra la pantalla de carga
  }

  const promocionesFiltradas = promociones.filter((promo) => {
    const coincideBanco =
      filtroBanco.length === 0 || filtroBanco.includes(promo.banco);
    const coincideCategoria =
      filtroCategoria.length === 0 ||
      promo.categorias.some((cat) => filtroCategoria.includes(cat));
    const coincideDia =
      filtroDia.length === 0 || filtroDia.some((dia) => promo.dias_aplicacion.includes(dia));
    const coincideBusqueda =
      busqueda === "" ||
      promo.titulo.toLowerCase().includes(busqueda.toLowerCase());
  
    return coincideBanco && coincideCategoria && coincideDia && coincideBusqueda;
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

      <div className="flex flex-col gap-4 md:flex-row md:gap-6 items-center justify-center m-8">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm shadow-md"
        />
      </div>
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
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {promocionesFiltradas.length > 0 ? (
          promocionesFiltradas.map((promo) => (
            <Card
              key={promo.id}
              {...promo}
              onClick={() => setSelectedPromotion(promo)} // Vincular el clic
            />
          ))
        ) : (
        <div className="text-center w-full mt-16">
          {/* Mensaje divertido */}
          <p className="text-lg font-semibold text-gray-600">
          🦆 CUAK!! no hay promos con tu selección. Seguí participando
          </p>
        </div>
        )}
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
