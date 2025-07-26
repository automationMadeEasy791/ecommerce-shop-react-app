import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import Hero from "../components/Hero";
import React, { useContext, useState} from "react";


const Home = () => {

  const { products } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products
    .filter(
      (item) =>
        item.category === "smartphones" ||
        item.category === "laptops"
    )
    .filter((item) => {
      const term = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
      );
    });

  return (
    <div data-testid="home-page">
      <Hero />
      <section className="py-20" data-testid="products-section">
        <div className="container mx-auto">
          <h1
            className="text-3xl font-semibold mb-6 text-center"
            data-testid="products-header"
          >
            Products
          </h1>

          {/* 🔍 Search bar */}
          <div
            className="flex justify-center mb-10"
            data-testid="search-bar-wrapper"
          >
            <input
              type="text"
              placeholder="Search by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full max-w-md"
              data-testid="search-bar"
            />
          </div>

          {/* 🛒 Product grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0"
            data-testid="product-grid"
          >
            {filteredProducts.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
