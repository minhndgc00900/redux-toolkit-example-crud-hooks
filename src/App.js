import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ProductsList from "./pages/ProductsList";
import AddProduct from "./pages/AddProduct";
import Product from "./pages/Product";
import Navigation from "./components/Navigation";


function App() {
  return (
    <Router>
      <Navigation />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/products/:id" element={<Product />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
