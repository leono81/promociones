import React, { useState } from "react";
import DropdownMultiSelect from "./DropdownMultiSelect";
import { ArrowPathIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

function Filters({
  filtroBanco,
  setFiltroBanco,
  filtroCategoria,
  setFiltroCategoria,
  filtroDia,
  setFiltroDia,
  setOrden,
  categorias,
}) {
  const bancos = ["Banco Galicia", "Banco Francés", "Tarjeta Naranja"];
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

  const renderChips = (selectedOptions, setSelectedOptions) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {selectedOptions.map((option, index) => (
        <div
          key={index}
          className="bg-primary text-white px-3 py-1 rounded-full flex items-center gap-2 cursor-pointer"
          onClick={() =>
            setSelectedOptions(selectedOptions.filter((item) => item !== option))
          }
        >
          {option}
          <span className="text-sm font-bold">&times;</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-6 items-center justify-center">
      {/* Filtro de Banco */}
      <div className="w-full md:w-auto flex flex-col items-center md:items-start min-h-[100px]">
        <DropdownMultiSelect
          label="Banco"
          options={bancos}
          selectedOptions={filtroBanco}
          setSelectedOptions={setFiltroBanco}
        />
        <div className="mt-2 w-full md:w-auto flex flex-wrap gap-2">
          {renderChips(filtroBanco, setFiltroBanco)}
        </div>
      </div>
  
      {/* Filtro de Categoría */}
      <div className="w-full md:w-auto flex flex-col items-center md:items-start min-h-[100px]">
        <DropdownMultiSelect
          label="Categoría"
          options={Array.isArray(categorias) ? categorias : []}
          selectedOptions={filtroCategoria}
          setSelectedOptions={setFiltroCategoria}
        />
        <div className="mt-2 w-full md:w-auto flex flex-wrap gap-2">
          {renderChips(filtroCategoria, setFiltroCategoria)}
        </div>
      </div>
  
      {/* Filtro de Día */}
      <div className="w-full md:w-auto flex flex-col items-center md:items-start min-h-[100px]">
        <DropdownMultiSelect
          label="Día"
          options={dias}
          selectedOptions={filtroDia}
          setSelectedOptions={setFiltroDia}
        />
        <div className="mt-2 w-full md:w-auto flex flex-wrap gap-2">
          {renderChips(filtroDia, setFiltroDia)}
        </div>
      </div>
  
      {/* Botones */}
      <div className="flex gap-4 mt-4">
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
    </div>
  );  
}

export default Filters;
