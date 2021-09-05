import React, { useContext, useState, useEffect, createContext } from "react";
import { firestore } from "../firebase";

const ProductsContext = createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalProductCount, setTotalProductCount] = useState();

  const [sortFilter, setSortFilter] = useState("Latest Addition");
  const [sortRadio, setSortRadio] = useState("Latest Addition");
  const [categoryRadio, setCategoryRadio] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const producstRef = firestore.collection("Products");

  const sortFilters = ["Top Sales", "Price(Low to High)", "Price(High to Low)"];

  const getProducts = () => {
    setLoading(true);

    producstRef.orderBy("date", "desc").onSnapshot((querySnapshot) => {
      setTotalProductCount(querySnapshot.size);
      const products = [];
      const categories = [];

      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
        categories.push(doc.data().category);
        // console.log({ id: doc.id, ...doc.data() });
      });

      setProducts(products);
      setCategories([...new Set(categories)]);
      setLoading(false);
      // console.log(categoryImages)
    });
  };

  useEffect(() => {
    getProducts();
  }, [sortFilter == "Latest Addition"]);

  const value = {
    getProducts,
    products,
    setProducts,
    sortFilters,
    categories,
    setCategories,
    totalProductCount,
    setTotalProductCount,
    sortFilter,
    setSortFilter,
    sortRadio,
    setSortRadio,
    categoryRadio,
    setCategoryRadio,
    selectedCategory,
    setSelectedCategory,
  };

  return (
    <ProductsContext.Provider value={value}>
      {!loading && children}
    </ProductsContext.Provider>
  );
};
