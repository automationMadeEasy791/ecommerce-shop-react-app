import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { ProductContext } from "../contexts/ProductContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { products } = useContext(ProductContext);

  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <section
        className="h-screen flex justify-center items-center"
        data-testid="product-loading"
      >
        Loading...
      </section>
    );
  }

  const { title, price, description, thumbnail } = product;

  return (
    <section
      className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center"
      data-testid="product-details"
    >
      <div className="container mx-auto">
        <div
          className="flex flex-col lg:flex-row items-center"
          data-testid="product-details-wrapper"
        >
          <div
            className="flex flex-1 justify-center items-center mb-8 lg:mb-0"
            data-testid="product-image-wrapper"
          >
            <img
              className="max-w-[200px] lg:max-w-xs"
              src={thumbnail}
              alt=""
              data-testid="product-image"
            />
          </div>
          <div
            className="flex-1 text-center lg:text-left"
            data-testid="product-text-wrapper"
          >
            <h1
              className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0"
              data-testid="product-title"
            >
              {title}
            </h1>
            <div
              className="text-2xl text-red-500 font-medium mb-6"
              data-testid="product-price"
            >
              $ {price}
            </div>
            <p className="mb-8" data-testid="product-description">
              {description}
            </p>
            <button
              onClick={() => addToCart(product, product.id)}
              className="bg-primary py-4 px-8 text-white"
              data-testid="add-to-cart-button"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
