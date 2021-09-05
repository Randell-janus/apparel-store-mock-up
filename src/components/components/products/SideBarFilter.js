import { useProducts } from "../../../contexts/ProductsContext";

const SideBarFilter = () => {
  const {
    sortRadio,
    setSortRadio,
    sortFilters,
    setSortFilter,
    categoryRadio,
    setCategoryRadio,
    categories,
    setSelectedCategory,
  } = useProducts();

  const getLatestAddition = () => {
    setSortFilter("Latest Addition");
    setSortRadio("Latest Addition");
  };

  return (
    <div>
      {/* SORT FILTER */}
      <section className="py-6 space-y-4 flex flex-col">
        <h3 className="">Sort Filters</h3>
        <div>
          <label
            onClick={getLatestAddition}
            className="space-x-2 hover:text-gray-800"
          >
            <input
              type="radio"
              checked={sortRadio === "Latest Addition"}
              value="Latest Addition"
              onChange={(e) => setSortRadio(e.target.value)}
              className="cursor-pointer text-gray-800 focus:ring-0"
            />
            <span
              className={`cursor-pointer ${
                sortRadio == "Latest Addition" && "font-medium"
              }`}
            >
              Latest Addition
            </span>
          </label>
        </div>
        {sortFilters.map((filter, i) => (
          <div key={i}>
            <label
              onClick={() => setSortFilter(filter)}
              className="space-x-2 hover:text-gray-800"
            >
              <input
                type="radio"
                checked={sortRadio === filter}
                value={filter}
                onChange={(e) => setSortRadio(e.target.value)}
                className="cursor-pointer text-gray-800 focus:ring-0"
              />
              <span
                className={`cursor-pointer ${
                  sortRadio === filter && "font-medium"
                }`}
              >
                {filter}
              </span>
            </label>
          </div>
        ))}
      </section>
      {/* CATEGORY FILTER */}
      <section className="h-5/6 py-6 border-t space-y-4 flex flex-col overflow-y-auto">
        <h3 className="">Categories</h3>
        <div>
          <label
            onClick={() => setSelectedCategory("")}
            className="space-x-2 hover:text-gray-800"
          >
            <input
              type="radio"
              checked={categoryRadio === ""}
              value=""
              onChange={(e) => setCategoryRadio(e.target.value)}
              className="cursor-pointer text-gray-800 focus:ring-0"
            />
            <span
              className={`cursor-pointer ${
                categoryRadio == "" && "font-medium"
              }`}
            >
              All Category
            </span>
          </label>
        </div>
        {categories.map((category, index) => (
          <div key={index}>
            <label
              onClick={() => setSelectedCategory(category)}
              className="space-x-2 hover:text-gray-800"
            >
              <input
                type="radio"
                checked={categoryRadio === category}
                value={category}
                onChange={(e) => setCategoryRadio(e.target.value)}
                className="cursor-pointer text-gray-800 focus:ring-0"
              />
              <span
                className={`capitalize cursor-pointer ${
                  categoryRadio === category && "font-medium"
                }`}
              >
                {category}
              </span>
            </label>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SideBarFilter;
