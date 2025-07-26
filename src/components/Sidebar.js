import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, itemAmount, total } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    localStorage.setItem("checkoutCart", JSON.stringify(cart));
    localStorage.setItem("checkoutTotal", total);
    navigate("/checkout", {
      state: { message: "✅ Your order has been placed successfully!" },
    });
  };

  return (
    <div className={`${
      isOpen ? "right-0" : "-right-full"
    } fixed top-0 right-0 h-full w-full md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] bg-white shadow-2xl transition-all duration-300 z-20 px-4 lg:px-[35px]`}>
      {/* Header */}
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">Shopping Bag ({itemAmount})</div>
        <div onClick={handleClose} className="cursor-pointer w-8 h-8 flex justify-center items-center">
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto border-b">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-y-3 mt-4">
        <div className="flex justify-between items-center">
          <div className="font-semibold">Subtotal: ${parseFloat(total).toFixed(2)}</div>
          <div onClick={clearCart} className="cursor-pointer bg-red-500 text-white w-12 h-12 flex justify-center items-center">
            <FiTrash2 />
          </div>
        </div>
        <Link to="/" className="bg-gray-200 p-3 text-center text-primary font-medium">View Cart</Link>
        <button onClick={handleCheckout} className="bg-primary p-3 text-white text-center font-medium">Checkout</button>
      </div>
    </div>
  );
};

export default Sidebar;
