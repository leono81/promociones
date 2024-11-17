import React from "react";

function Card({ titulo, subtitulo, promocion, categorias, dias_aplicacion, onClick }) {
    return (
      <div
        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg cursor-pointer"
        onClick={onClick}
      >
        <h2 className="text-lg font-bold text-dark mb-2">{titulo}</h2>
        <p className="text-sm text-gray-600">{subtitulo}</p>
        <p className="text-sm text-primary mb-4">{promocion}</p>
        {categorias && (
          <p className="text-sm text-gray-500">
            <strong>Categorías:</strong> {categorias.join(", ")}
          </p>
        )}
        {dias_aplicacion && (
          <p className="text-sm text-gray-500">
            <strong>Días:</strong> {dias_aplicacion.join(", ")}
          </p>
        )}
      </div>
    );
  }
  
  export default Card;
  
  
  
  
