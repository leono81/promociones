import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

function PromotionDetail({ promotion, onClose }) {
  if (!promotion) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4">{promotion.titulo || "Promoción"}</h2>

        {/* Details */}
        <div className="space-y-4">
          {promotion.subtitulo && (
            <p className="text-lg text-gray-700">{promotion.subtitulo}</p>
          )}
          {promotion.promocion && (
            <p className="text-md text-gray-600">{promotion.promocion}</p>
          )}
          {promotion.categorias && (
            <p>
              <strong>Categorías:</strong> {promotion.categorias.join(", ")}
            </p>
          )}
          {promotion.dias_aplicacion && (
            <p>
              <strong>Días de Aplicación:</strong> {promotion.dias_aplicacion.join(", ")}
            </p>
          )}
          {promotion.vigencia && promotion.vigencia.desde && (
            <p>
              <strong>Vigencia:</strong> {promotion.vigencia.desde} -{" "}
              {promotion.vigencia.hasta || "Indefinida"}
            </p>
          )}
          {promotion.medios_pago && (
            <div>
              <strong>Medios de Pago:</strong>
              <ul className="list-disc ml-6">
                {promotion.medios_pago.map((pago, index) => (
                  <li key={index}>{`${pago.tarjeta} (${pago.tipo_tarjeta})`}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Add to Google Calendar Button */}
        <button
          className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          onClick={() => alert("Agregar a Google Calendar aún no implementado.")}
        >
          Agregar a Google Calendar
        </button>
      </div>
    </div>
  );
}

export default PromotionDetail;
