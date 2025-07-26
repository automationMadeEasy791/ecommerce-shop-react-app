import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContext";

const CheckoutButton = ({ cartItems, cartTotal, currentUser }) => {
  const { token } = useContext(AuthContext);

  const handleCheckout = async () => {
    try {
      const orderData = {
        items: cartItems,
        total: cartTotal,
        userId: currentUser.id,
        date: new Date().toISOString(),
        status: "Processing" // default status
      };

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      if (!res.ok) throw new Error(`Failed: ${res.status}`);

      const result = await res.json();
      toast.success("Order placed successfully! 🎉");
      console.log("Order response:", result);
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Couldn’t place order.");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
