import React, { useState } from "react";
import DropdownMultiSelect from "./DropdownMultiSelect";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

function Filters({ setFiltroBanco, setFiltroCategoria, setFiltroDia, setOrden }) {
  const bancos = ["Galicia", "BBVA", "Naranja"];
  const categorias = ["Indumentaria", "Electro y Tecnología"];
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  const [selectedBancos, setSelectedBancos] = useState([]);
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const [selectedDias, setSelectedDias] = useState([]);

  const limpiarFiltros = () => {
    setSelectedBancos([]);
    setSelectedCategorias([]);
    setSelectedDias([]);
    setFiltroBanco([]);
    setFiltroCategoria([]);
    setFiltroDia([]);
    setOrden("");
  };

  return (
    <div className="p-6 mb-8">
      <div className="flex flex-col gap-4 md:flex-row md:gap-6 items-center">
        {/* Dropdowns */}
        <DropdownMultiSelect
          label="Banco"
          options={bancos}
          selectedOptions={selectedBancos}
          setSelectedOptions={(selected) => {
            setSelectedBancos(selected);
            setFiltroBanco(selected);
          }}
        />
        <DropdownMultiSelect
          label="Categoría"
          options={categorias}
          selectedOptions={selectedCategorias}
          setSelectedOptions={(selected) => {
            setSelectedCategorias(selected);
            setFiltroCategoria(selected);
          }}
        />
        <DropdownMultiSelect
          label="Día"
          options={dias}
          selectedOptions={selectedDias}
          setSelectedOptions={(selected) => {
            setSelectedDias(selected);
            setFiltroDia(selected);
          }}
        />

        {/* Botón para limpiar filtros */}
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
