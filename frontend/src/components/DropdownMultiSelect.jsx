import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";

function DropdownMultiSelect({ options, selectedOptions, setSelectedOptions, label }) {
  const [searchTerm, setSearchTerm] = useState("");

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-64">
      <Listbox value={selectedOptions} onChange={() => {}}>
        {() => (
          <>
            <Listbox.Label className="block text-lg font-semibold text-dark mb-1">
              {label}
            </Listbox.Label>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-50 border border-gray-300 py-2 pl-3 pr-10 text-left shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm">
                <span className="block truncate">
                  {selectedOptions.length > 0 ? selectedOptions.join(", ") : "Selecciona..."}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
                </span>
              </Listbox.Button>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-gray-300 focus:outline-none sm:text-sm">
                  {/* Campo de búsqueda */}
                  <div className="px-3 py-2">
                    <input
                      type="text"
                      placeholder="Buscar..."
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Opciones filtradas */}
                  {filteredOptions.map((option, index) => (
                    <Listbox.Option
                      key={index}
                      value={option}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 text-sm ${
                          active ? "bg-primary text-white" : "text-gray-900"
                        }`
                      }
                      onClick={() => toggleOption(option)}
                    >
                      <>
                        <span
                          className={`block truncate ${
                            selectedOptions.includes(option) ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option}
                        </span>
                        {selectedOptions.includes(option) && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    </Listbox.Option>
                  ))}

                  {/* Mensaje si no hay opciones */}
                  {filteredOptions.length === 0 && (
                    <div className="py-2 px-4 text-sm text-gray-500">No se encontraron resultados</div>
                  )}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}

export default DropdownMultiSelect;
