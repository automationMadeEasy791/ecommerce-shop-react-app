import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Fetch from tech categories only
  useEffect(() => {
    const fetchTechProducts = async () => {
      try {
        const categories = ["smartphones", "laptops", "electronics"];
        const all = [];

        for (const category of categories) {
          const res = await fetch(`https://dummyjson.com/products/category/${category}`);
          const data = await res.json();
          all.push(...data.products);
        }

        setProducts(all);
      } catch (error) {
        console.error("Failed to fetch tech products", error);
      }
    };

    fetchTechProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
