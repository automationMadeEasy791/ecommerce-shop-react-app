import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Contexts
import AuthProvider from "./contexts/AuthContext";
import ProductProvider from "./contexts/ProductContext";
import SidebarProvider from "./contexts/SidebarContext";
import CartProvider from "./contexts/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SidebarProvider>
    <CartProvider>
      <ProductProvider>
        <AuthProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </AuthProvider>
      </ProductProvider>
    </CartProvider>
  </SidebarProvider>
);
