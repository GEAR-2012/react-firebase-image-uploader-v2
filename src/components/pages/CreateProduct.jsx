import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import ProductForm from "../forms/ProductForm";
import uuid from "react-uuid";
import useSetDoc from "../../hooks/use-set-doc";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  // this state holds the product datas
  const initUploadData = { name: "", price: "", pictureList: [] };
  const [uploadData, setUploadData] = useState(initUploadData);
  const [docId, setDocId] = useState("");

  useSetDoc("Products", uploadData, docId).then((resp) => {
    // redirect
    if (resp === true) navigate("/");
  });

  const createHandler = () => {
    setDocId(uuid()); // trigger 'useSetDoc' hook
  };

  return (
    <Grid container spacing={5} sx={{ marginTop: 0 }}>
      <Grid item xs={12}>
        <Typography variant="h3">Create a new Product</Typography>
      </Grid>
      <Grid item xs={12}>
        <ProductForm setUploadData={setUploadData} uploadData={uploadData} />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" type="button" onClick={createHandler}>
          Create Product
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateProduct;
