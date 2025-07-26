import React, { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {
  const location = useLocation();
  const { cart, total } = useContext(CartContext);

  const message = location.state?.message || "✅ Your order has been placed successfully!";
  const isEmpty = cart.length === 0;

  return (
    <div className="py-10 px-4 md:px-10 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <div
          className={`${
            isEmpty ? "bg-gray-100 text-gray-700" : "bg-green-100 text-green-800"
          } p-6 rounded-md shadow-md text-center mb-6`}
        >
          {isEmpty ? (
            <>
              🛒 The bag is empty.<br />
              <Link to="/" className="underline text-blue-600 hover:text-blue-800">
                Continue shopping →
              </Link>
            </>
          ) : (
            message
          )}
        </div>

        {!isEmpty && (
          <>
            <div className="bg-white border rounded-md p-4 shadow-md mb-4">
              <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{item.title} × {item.amount}</span>
                  <span>${(item.price * item.amount).toFixed(2)}</span>
                </div>
              ))}
              <div className="text-right font-bold mt-4">
                Subtotal: ${parseFloat(total).toFixed(2)}
              </div>
            </div>

            {/* 👇 Add the checkout form here */}
            <CheckoutForm />
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
