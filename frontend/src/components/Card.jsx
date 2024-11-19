import React from "react";
import eminentLogo from "../assets/eminent-logo.png"; // Ruta del logo (guarda el archivo en /src/assets)
import bankColors from "../data/bankColors";

function Card({
  titulo,
  subtitulo,
  banco,
  promocion,
  categorias,
  dias_aplicacion,
  modeloAtencion,
  onClick,
  pagoQR, 
  pagoNFC, 
  cuotas, 
  ahorro 
}) {

  // Obtener el color del banco
  const bankColor = bankColors[banco]?.primary || "#CCCCCC"; // Gris por defecto


  // Función para determinar los estilos del tag basado en su estado
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
    <div
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg cursor-pointer relative"
      onClick={onClick}
    >
      {/* Logo de Éminent */}
      {modeloAtencion === "Eminent" && (
        <img
          src={eminentLogo}
          alt="Éminent Logo"
          className="absolute top-4 right-8 w-24 h-auto" // Ajuste con `h-auto`
          style={{ objectFit: "contain" }} // Asegura proporciones
        />
      )}

      {/* Título del Comercio */}
      <h2 className="text-lg font-bold text-dark mb-2">{titulo}</h2>
      <p className="text-sm text-gray-600">{subtitulo}</p>

      {/* Destacar la promoción */}
      <p className="text-md font-semibold text-primary mb-4">{promocion}</p>

      {/* Banco */}
      <p className="text-sm text-gray-500 mb-4">
        <strong>{banco}</strong> 
      </p>

      {/* Categorías */}
      {categorias && (
        <p className="text-sm text-gray-500">
          <strong>Categorías:</strong> {categorias.join(", ")}
        </p>
      )}

      {/* Días de Aplicación */}
      {dias_aplicacion && (
        <p className="text-sm text-gray-500">
          <strong>Días:</strong> {dias_aplicacion.join(", ")}
        </p>
      )}

      {/* Tags de características */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className={getTagStyles("pagoQR", pagoQR)}>Pago QR</span>
        <span className={getTagStyles("pagoNFC", pagoNFC)}>Pago NFC</span>
        <span className={getTagStyles("cuotas", cuotas)}>Cuotas</span>
        <span className={getTagStyles("ahorro", ahorro)}>Ahorro</span>
      </div>

      {/* Cinta del Banco */}
      <div
        className="absolute bottom-0 right-0 w-0 h-0 border-b-[40px] border-l-[40px]"
        style={{
          borderBottomColor: bankColor, // Color del banco
          borderLeftColor: "transparent", // Transparente para el resto
        }}
      ></div>
    </div>

  );
}

export default Card;
