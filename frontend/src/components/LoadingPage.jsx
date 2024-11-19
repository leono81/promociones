import React, { useState, useEffect } from "react";

const LoadingPage = () => {
  const frases = [
    "Cargando más lento que argentino volviendo al laburo después de los festejos del Mundial...",
    "Esperá tranquilo, que las cosas gratis y los descuentos tardan un poquito más...",
    "Tomate un mate mientras esperás, esto carga despacito pero con amor.",
    "Paciencia, che... Esto tiene la velocidad de un domingo al mediodía.",
    "Aguantame que esto es gratis, y ya sabés: lo gratis se cocina a fuego lento.",
    "Las promos gratis tardan más porque están hechas con amor y presupuesto cero.",
    "Lo bueno tarda en llegar... y si es gratis, tarda el doble, ¡pero acá estamos!"
  ];

  const [fraseActual, setFraseActual] = useState(frases[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFraseActual((prevFrase) => {
        const currentIndex = frases.indexOf(prevFrase);
        return frases[(currentIndex + 1) % frases.length];
      });
    }, 7000); // Cambia cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-6"></div>
      {/* Frase */}
      <p className="text-lg font-medium justify-center p-8 text-center">{fraseActual}</p>
    </div>
  );
};

export default LoadingPage;
