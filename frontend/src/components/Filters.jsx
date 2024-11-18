import React, { useState } from "react";
import DropdownMultiSelect from "./DropdownMultiSelect";
import { ArrowPathIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

function Filters({ setFiltroBanco, setFiltroCategoria, setFiltroDia, setOrden, categorias }) {
  const bancos = ["Galicia", "BBVA", "Naranja"];
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const [orden, setOrdenInterno] = useState("");

  const limpiarFiltros = () => {
    setFiltroBanco([]);
    setFiltroCategoria([]);
    setFiltroDia([]);
    setOrden("");
    setOrdenInterno("");
  };

  const toggleOrden = () => {
    const nuevoOrden = orden === "" ? "asc" : orden === "asc" ? "desc" : "";
    setOrden(nuevoOrden);
    setOrdenInterno(nuevoOrden);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-6 items-center">
      <DropdownMultiSelect
        label="Banco"
        options={bancos}
        selectedOptions={[]}
        setSelectedOptions={setFiltroBanco}
      />
      <DropdownMultiSelect
        label="Categoría"
        options={Array.isArray(categorias) ? categorias : []} // Aseguramos que sea un array
        selectedOptions={[]}
        setSelectedOptions={setFiltroCategoria}
      />
      <DropdownMultiSelect
        label="Día"
        options={dias}
        selectedOptions={[]}
        setSelectedOptions={setFiltroDia}
      />
      <button
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
          orden === "asc"
            ? "bg-primary text-white hover:bg-primary/80"
            : orden === "desc"
            ? "bg-secondary text-white hover:bg-secondary/80"
            : "bg-neutral text-gray-700 hover:bg-neutral/80 border border-gray-400"
        }`}
        onClick={toggleOrden}
        aria-label="Ordenar por título"
      >
        {orden === "asc" ? (
          <ChevronUpIcon className="w-6 h-6" />
        ) : orden === "desc" ? (
          <ChevronDownIcon className="w-6 h-6" />
        ) : (
          <ChevronUpIcon className="w-6 h-6 text-gray-400" />
        )}
      </button>
      <button
        className="flex items-center justify-center w-10 h-10 bg-accent text-white rounded-full hover:bg-accent/80 focus:ring-2 focus:ring-accent transition-all"
        onClick={limpiarFiltros}
        aria-label="Limpiar Filtros"
      >
        <ArrowPathIcon className="w-6 h-6" />
      </button>
    </div>
  );
}

export default Filters;
