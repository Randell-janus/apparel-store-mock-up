import { Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

import { useProducts } from "../../../contexts/ProductsContext";

export default function CategorySelect() {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    setCategoryRadio,
  } = useProducts();

  const categoryOptions = ["All Types"];
  categories.forEach((category) => {
    categoryOptions.push(category);
  });

  useEffect(() => {
    if (selectedCategory.includes("All Typ")) {
      setCategoryRadio("");
    } else {
      setCategoryRadio(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <div className="xs:w-40">
      <Listbox value={selectedCategory} onChange={setSelectedCategory}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-gray-100 rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500">
            <span className="block truncate">Categories</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {categoryOptions.map((cat, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `${active ? "bg-gray-100" : "text-gray-900"}
                          cursor-pointer select-none relative py-2 pl-10 pr-4`
                  }
                  value={cat}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {cat}
                      </span>
                      {selected ? (
                        <span
                          className={`${active && "text-gray-800"}
                                absolute z-10 inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
