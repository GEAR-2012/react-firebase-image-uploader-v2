import React from "react";
import { Container } from "@mui/material";
import Header from "./components/UI/Header";
import CreateProduct from "./components/pages/CreateProduct";
import Home from "./components/pages/Home";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import Product from "./components/pages/Product";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="create" element={<CreateProduct />} />
          <Route path="product/:id" element={<Product />} />
        </Routes>
      </Container>
    </React.Fragment>
  );
};

export default App;
