import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Home from "./components/pages/Home";
import Header from "./components/UI/Header";
import CreateProduct from "./components/pages/CreateProduct";
import UpdateProduct from "./components/pages/UpdateProduct";
import Product from "./components/pages/Product";
import NotFound from "./components/pages/NotFound";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="product_create" element={<CreateProduct />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="product_update/:id" element={<UpdateProduct />} />
        </Routes>
      </Container>
    </React.Fragment>
  );
};

export default App;
