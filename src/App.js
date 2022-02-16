import React from "react";
import { Container } from "@mui/material";
import Header from "./components/UI/Header";
import Upload from "./components/pages/Upload";
import Home from "./components/pages/Home";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/pages/NotFound";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Container>
    </React.Fragment>
  );
};

export default App;
