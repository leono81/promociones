import React, { useState } from "react";
import Filters from "./components/Filters";
import Card from "./components/Card";
import PromotionDetail from "./components/PromotionDetail";

function App() {
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const promocionesPrueba = [
    {
      id: "1",
      titulo: "Scandinavian",
      subtitulo: "Indumentaria",
      promocion: "20% de ahorro y hasta 3 cuotas sin interés",
      categorias: ["Indumentaria"],
      dias_aplicacion: ["Viernes"],
      vigencia: { desde: "01/11/2024", hasta: "31/12/2024" },
      medios_pago: [
        { tarjeta: "Visa", tipo_tarjeta: "Crédito" },
        { tarjeta: "Mastercard", tipo_tarjeta: "Débito" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-neutral p-6">
      <h1 className="text-2xl font-bold text-dark mb-6 text-center">
        Promociones Disponibles
      </h1>

      {/* Temporalmente sin filtros */}
      <Filters />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {promocionesPrueba.map((promo) => (
          <Card
            key={promo.id}
            {...promo}
            onClick={() => setSelectedPromotion(promo)}
          />
        ))}
      </div>

      {/* Vista Detallada */}
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
