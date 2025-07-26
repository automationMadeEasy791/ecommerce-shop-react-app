import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // 🔄 Always reset cart on app load
  useEffect(() => {
    localStorage.removeItem("cart");
    console.log("🔁 Cart forcibly reset");
  }, []);

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      toast("🛒 Restored cart from last session");
      return JSON.parse(storedCart);
    }
    return [];
  });

  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalValue = cart.reduce(
      (acc, item) => acc + item.price * item.amount,
      0
    );
    const totalItems = cart.reduce((acc, item) => acc + item.amount, 0);
    setTotal(totalValue);
    setItemAmount(totalItems);
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, id) => {
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      setCart(updatedCart);
      toast.success(`Increased quantity of ${product.title}`);
    } else {
      setCart([...cart, { ...product, amount: 1 }]);
      toast.success(`${product.title} added to cart`);
    }
  };

  const removeFromCart = (id) => {
    const removedItem = cart.find((item) => item.id === id);
    setCart(cart.filter((item) => item.id !== id));
    if (removedItem) {
      toast.error(`${removedItem.title} removed from cart`);
    }
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Your cart has been cleared");
  };

  const increaseAmount = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      addToCart(item, id);
    }
  };

  const decreaseAmount = (id) => {
    const item = cart.find((item) => item.id === id);
    if (!item) return;

    if (item.amount > 1) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, amount: cartItem.amount - 1 }
          : cartItem
      );
      setCart(updatedCart);
      toast(`Decreased quantity of ${item.title}`);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        itemAmount,
        total,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
