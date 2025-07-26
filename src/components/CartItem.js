import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { CartContext } from "../contexts/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, increaseAmount, decreaseAmount } = useContext(CartContext);
  const { id, title, thumbnail, price, amount } = item;

  return (
    <div
      className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500"
      data-testid={`cart-item-${id}`}
    >
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        {/* image */}
        <Link to={`/product/${id}`} data-testid={`cart-item-link-${id}`}>
          <img
            className="max-w-[80px]"
            src={thumbnail}
            alt=""
            data-testid={`cart-item-image-${id}`}
          />
        </Link>
        <div className="w-full flex flex-col">
          {/* title and remove icon */}
          <div className="flex justify-between mb-2">
            <Link
              to={`/product/${id}`}
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
              data-testid={`cart-item-title-${id}`}
            >
              {title}
            </Link>
            <div
              onClick={() => removeFromCart(id)}
              className="text-xl cursor-pointer"
              data-testid={`remove-button-${id}`}
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            <div
              className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium"
              data-testid={`quantity-control-${id}`}
            >
              <div
                onClick={() => decreaseAmount(id)}
                className="h-full flex-1 flex justify-center items-center cursor-pointer"
                data-testid={`decrease-amount-${id}`}
              >
                <IoMdRemove />
              </div>
              <div
                className="h-full flex justify-center items-center px-2"
                data-testid={`product-amount-${id}`}
              >
                {amount}
              </div>
              <div
                onClick={() => increaseAmount(id)}
                className="h-full flex flex-1 justify-center items-center cursor-pointer"
                data-testid={`increase-amount-${id}`}
              >
                <IoMdAdd />
              </div>
            </div>
            <div
              className="flex flex-1 justify-around items-center"
              data-testid={`product-price-${id}`}
            >
              $ {price}
            </div>
            <div
              className="flex flex-1 justify-end items-center text-primary font-medium"
              data-testid={`product-final-${id}`}
            >
              {`$ ${parseFloat(price * amount).toFixed(2)}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
