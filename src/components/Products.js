import { useState, useEffect } from "react";
import { PageHeading, PageLayout } from "./utils/PageUtils";
import { useProducts } from "../contexts/ProductsContext";
import Navbar from "./components/Navbar";

import ProductCard from "./components/products/ProductCard";

import CategorySelect from "./components/selectbox/CategorySelect";
import FilterSelect from "./components/selectbox/FilterSelect";
import SideBarFilter from "./components/products/SideBarFilter";
import Footer from "./components/footer/Footer";

const Products = () => {
  const [productsLoaded, setProductsLoaded] = useState(10);

  const {
    products,
    totalProductCount,
    sortFilter,
    sortRadio,
    categoryRadio,
    selectedCategory,
  } = useProducts();

  const displayProducts = (product, index) =>
    index < productsLoaded && (
      <ProductCard key={product.id} product={product} />
    );

  const displaySelectedCategoryResults = (product) => {
    const name = product.name.toLowerCase();
    const category = product.category.toLowerCase();
    const query = selectedCategory.toLowerCase();

    if (query == "" || query.includes("all")) {
      return product;
    } else if (name.includes(query) || category.includes(query)) {
      return product;
    }
  };

  useEffect(() => {
    setProductsLoaded(10);
  }, [sortFilter]);

  return (
    <>
      <Navbar />
      <PageHeading
        header={`${sortRadio}${categoryRadio && ": "}${categoryRadio}`}
      >
        <div className="flex flex-col xs:flex-row space-x-0 space-y-2 xs:space-y-0 xs:space-x-2 lg:hidden">
          <FilterSelect />
          <CategorySelect />
        </div>
      </PageHeading>
      <PageLayout space="space-y-8" bgColor="bg-white">
        <main className="flex">
          {/* SIDEBAR FILTER */}
          <section className="mr-10 w-44 hidden lg:flex flex-col">
            <SideBarFilter />
          </section>
          {/* PRODUCTS CONTAINER */}
          <section className="flex flex-col flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 sm:gap-y-8 sm:gap-x-6">
              {sortFilter === "Latest Addition" &&
                products
                  .filter(displaySelectedCategoryResults)
                  .map(displayProducts)}
              {sortFilter === "Top Sales" &&
                products
                  .sort((a, b) => b.sales - a.sales)
                  .filter(displaySelectedCategoryResults)
                  .map(displayProducts)}
              {sortFilter === "Price(Low to High)" &&
                products
                  .sort((a, b) => a.price - b.price)
                  .filter(displaySelectedCategoryResults)
                  .map(displayProducts)}
              {sortFilter === "Price(High to Low)" &&
                products
                  .sort((a, b) => b.price - a.price)
                  .filter(displaySelectedCategoryResults)
                  .map(displayProducts)}
            </div>
            {/* SCROLL PAGINATION */}
            <div>
              {productsLoaded < totalProductCount &&
                (selectedCategory.length == 0 ||
                  selectedCategory.toLowerCase().includes("all")) && (
                  <h3
                    className="cursor-pointer text-link text-right mt-8 italic font-medium"
                    onClick={() => setProductsLoaded((prev) => prev + 10)}
                  >
                    LOAD MORE PRODUCTS...
                  </h3>
                )}
            </div>
          </section>
        </main>
      </PageLayout>
      <Footer />
    </>
  );
};

export default Products;
