import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { CartContext } from "../contexts/CartContext";

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { id, thumbnail, category, title, price } = product;

  return (
    <div data-testid={`product-card-${id}`}>
      <div
        className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition"
        data-testid={`product-frame-${id}`}
      >
        <div className="w-full h-full flex justify-center items-center">
          <div
            className="w-[200px] mx-auto flex justify-center items-center"
            data-testid={`product-image-wrapper-${id}`}
          >
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={thumbnail}
              alt=""
              data-testid={`product-image-${id}`}
            />
          </div>
        </div>
        <div
          className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
          data-testid={`product-actions-${id}`}
        >
          <button
            onClick={() => addToCart(product, id)}
            data-testid={`add-to-cart-button-${id}`}
          >
            <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <Link
            to={`/product/${id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
            data-testid={`view-product-button-${id}`}
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div data-testid={`product-meta-${id}`}>
        <div
          className="tex-sm capitalize text-gray-500 mb-1"
          data-testid={`product-category-${id}`}
        >
          {category}
        </div>
        <Link to={`/product/${id}`} data-testid={`product-title-link-${id}`}>
          <h2 className="font-semibold mb-1" data-testid={`product-title-${id}`}>
            {title}
          </h2>
        </Link>
        <h2 className="font-semibbold" data-testid={`product-price-${id}`}>
          $ {price}
        </h2>
      </div>
    </div>
  );
};

export default Product;
