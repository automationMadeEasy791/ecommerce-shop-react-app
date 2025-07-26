import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import toast from "react-hot-toast";

const CheckoutForm = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    payment: "card",
  });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.address ||
      !form.payment ||
      cart.length === 0
    ) {
      toast.error("Please complete the form and add products to cart");
      return;
    }

    const order = {
      ...form,
      products: cart.map((item) => ({
        productId: item.id,
        name: item.title,
        quantity: item.amount,
        price: item.price,
      })),
      total,
      date: new Date().toISOString(),
      status: "completed",
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (res.ok) {
        toast.success("Order placed!");
        setStatus("✅ Your order has been successfully placed!");
        clearCart();
        navigate("/orders", { replace: true }); // 🌟 Redirect here!
      } else {
        toast.error("Failed to place order");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-md rounded px-6 py-8 space-y-5"
    >
      <h2 className="text-2xl font-bold text-center">Place Your Order</h2>

      <input
        name="name"
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />

      <textarea
        name="address"
        placeholder="Shipping Address"
        rows="3"
        value={form.address}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />

      <select
        name="payment"
        value={form.payment}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      >
        <option value="card">Credit/Debit Card</option>
        <option value="paypal">PayPal</option>
        <option value="cash">Cash on Delivery</option>
      </select>

      <button
        type="submit"
        className="bg-primary text-white w-full py-3 rounded font-semibold"
      >
        Place Order (${parseFloat(total).toFixed(2)})
      </button>

      {status && (
        <p className="text-green-600 text-center font-medium mt-4">{status}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
