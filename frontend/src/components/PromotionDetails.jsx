import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import eminentLogo from "../assets/eminent-logo.png"; // Ruta al logo Eminent

function PromotionDetails({ promotion, onClose }) {
  if (!promotion) return null;

  // Función para estilos de tags
  const getTagStyles = (type, isActive) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    const colors = {
      pagoQR: isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700",
      pagoNFC: isActive ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700",
      cuotas: isActive ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700",
      ahorro: isActive ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700",
    };
    return `${baseClasses} ${colors[type]}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-6 relative">
        {/* Botón Cerrar */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold mb-4">{promotion.titulo || "Promoción"}</h2>

        {/* Subtítulo */}
        {promotion.subtitulo && (
          <p className="text-lg text-gray-700 mb-4">{promotion.subtitulo}</p>
        )}

        {/* Promoción destacada */}
        {promotion.promocion && (
          <div className="bg-primary text-white py-2 px-4 rounded-md text-lg font-semibold mb-6">
            {promotion.promocion}
          </div>
        )}

        {/* Categorías */}
        {promotion.categorias && (
          <div className="mb-4">
            <h3 className="text-lg font-bold">Categorías:</h3>
            <div className="flex flex-wrap gap-2">
              {promotion.categorias.map((categoria, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {categoria}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Días de Aplicación */}
        {promotion.dias_aplicacion && (
          <div className="mb-4">
            <h3 className="text-lg font-bold">Días de Aplicación:</h3>
            <p className="text-sm text-gray-500">{promotion.dias_aplicacion.join(", ")}</p>
          </div>
        )}

        {/* Vigencia */}
        {promotion.vigencia && promotion.vigencia.desde && (
          <div className="mb-4">
            <h3 className="text-lg font-bold">Vigencia:</h3>
            <p className="text-sm text-gray-500">
              {promotion.vigencia.desde} - {promotion.vigencia.hasta || "Indefinida"}
            </p>
          </div>
        )}

        {/* Medios de Pago */}
        {promotion.medios_pago && (
          <div className="mb-4">
            <h3 className="text-lg font-bold">Medios de Pago:</h3>
            <ul className="list-disc ml-6 text-sm text-gray-600">
              {promotion.medios_pago.map((pago, index) => (
                <li key={index}>{`${pago.tarjeta} (${pago.tipo_tarjeta})`}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Modelo de Atención */}
        {promotion.modeloAtencion === "Eminent" && (
          <div className="flex items-center mb-6">
            <img
              src={eminentLogo}
              alt="Eminent"
              className="w-16 h-auto mr-4"
            />
            <span className="text-lg text-yellow-700 font-semibold">Socio: Eminent</span>
          </div>
        )}

        {/* Tags */}
        <div className="mb-6">
          <h3 className="text-lg font-bold">Características:</h3>
          <div className="flex flex-wrap gap-2">
            <span className={getTagStyles("pagoQR", promotion.pagoQR)}>Pago QR</span>
            <span className={getTagStyles("pagoNFC", promotion.pagoNFC)}>Pago NFC</span>
            <span className={getTagStyles("cuotas", promotion.cuotas)}>Cuotas</span>
            <span className={getTagStyles("ahorro", promotion.ahorro)}>Ahorro</span>
          </div>
        </div>

        {/* Botón Agregar a Google Calendar */}
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

export default PromotionDetails;
