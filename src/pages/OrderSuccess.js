import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const message = location.state?.message || "✅ Your order was successfully placed.";

  return (
    <div
      className="h-screen flex flex-col justify-center items-center text-center px-4"
      data-testid="order-success-page"
    >
      <div className="max-w-lg w-full bg-green-50 border border-green-300 text-green-800 px-6 py-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Order Success</h2>
        <p className="text-xl font-medium" data-testid="order-success-message">
          {message}
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition"
            data-testid="continue-shopping-button"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
