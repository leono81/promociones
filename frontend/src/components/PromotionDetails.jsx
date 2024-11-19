import React from "react";
import { XMarkIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { CalendarIcon } from "@heroicons/react/24/solid";
import eminentLogo from "../assets/eminent-logo.png"; // Ruta al logo Eminent
import bankColors from "../data/bankColors";
import { addDaysToGoogleCalendar } from "../utils/calendarUtils";




function PromotionDetails({ promotion, onClose }) {
  if (!promotion) return null;

  // Función para obtener el enlace de promociones del banco
  const getBankPromotionsUrl = (banco) => {
    switch (banco) {
      case "Banco Galicia":
        return "https://www.galicia.ar/personas/buscador-de-promociones";
      case "Banco Francés":
        return "https://go.bbva.com.ar/fgo/#/";
      case "Tarjeta Naranja":
        return "https://www.naranjax.com/promociones/";
      default:
        return null; // Sin enlace si el banco no está en la lista
    }
  };

  const bankUrl = getBankPromotionsUrl(promotion.banco);

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

  // Obtener el color del banco
  const bankColor = bankColors[promotion.banco]?.primary || "#CCCCCC"; // Gris por defecto


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-6 relative">
        {/* Cinta del Banco */}
          <div
            className="absolute bottom-0 right-0 w-0 h-0 border-b-[40px] border-l-[40px]"
            style={{
              borderBottomColor: bankColor,
              borderLeftColor: "transparent",
            }}
          ></div>


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

        {/* Banco */}
        {promotion.subtitulo && (
          <div className="mb-4">
            <h3 className="text-lg font-bold">Categorías:</h3>
            <p className="text-lg text-gray-700 mb-4">{promotion.banco}</p>
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
              className="w-16 h-auto w-32"
            />
            {/* <span className="text-lg text-yellow-700 font-semibold">Socio: Eminent</span> */}
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

        {/* Botón para Google Calendar */}
        {/* Botones inferiores */}
        <div className="flex justify-between mt-6">
          <button
            className="flex items-center justify-center w-12 h-12 bg-[#4285F4] text-white rounded-full hover:bg-[#357AE8] focus:outline-none focus:ring-2 focus:ring-[#4285F4] transition-all"
            onClick={() => {
              const daysToAdd = promotion.dias_aplicacion || ["Consultar día en la web"];
              const title = promotion.titulo || "Promoción";
              const description = promotion.promocion || "Detalles de la promoción";
              const vigencia = promotion.vigencia || {};
              
              const calendarLink = addDaysToGoogleCalendar(title, description, daysToAdd, vigencia);

              if (calendarLink) {
                window.open(calendarLink, "_blank");
              } else {
                alert("No se pudo generar un enlace para Google Calendar.");
              }
            }}
          >
            <CalendarIcon className="w-6 h-6" />
          </button>

          {/* Botón para promociones del banco */}
          {bankUrl && (
            <a
              href={bankUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-secondary text-white rounded-full hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
            >
              <ArrowTopRightOnSquareIcon className="w-6 h-6" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default PromotionDetails;
