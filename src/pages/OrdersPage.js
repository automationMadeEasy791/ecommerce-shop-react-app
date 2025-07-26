import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const OrdersPage = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let didFetch = false;

    const fetchOrders = async () => {
      if (didFetch) return;
      didFetch = true;

      try {
        const res = await fetch("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const text = await res.text();
        const data = JSON.parse(text);
        const savedOrders = Array.isArray(data) ? data : data.orders || [];

        setOrders(savedOrders);
        setLoading(false);

        // ✅ Show toast after successful data load
        if (savedOrders.length > 0) {
          toast.success("Order history loaded");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch orders.");
        toast.error("Couldn’t load your orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col min-h-full">
      <h1 className="text-3xl font-semibold mb-6 text-center">Order History</h1>

      {loading && <p className="text-center">Loading…</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p className="text-center">No orders yet. Go treat yourself! 🛍️</p>
      )}

      {!loading && !error && orders.length > 0 && (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="bg-white p-4 rounded shadow flex flex-col space-y-2"
            >
              <div className="flex justify-between">
                <p className="font-medium">Order #{order.id}</p>
                <span className="text-sm text-gray-600">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>
              <div>
                {order.products?.map((item, index) => (
                  <p key={index} className="text-sm text-gray-700">
                    • {item.name} × {item.quantity}
                  </p>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">${order.total.toFixed(2)}</p>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  {order.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
