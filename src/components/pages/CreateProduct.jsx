import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import { Grid, Typography } from "@mui/material";
import ProductForm from "../forms/ProductForm";
import useSetDoc from "../../hooks/use-set-doc";

const CreateProduct = () => {
  const navigate = useNavigate();
  // this state holds the product datas
  const initUploadData = { name: "", price: "", pictureList: [] };
  const [uploadData, setUploadData] = useState(initUploadData);
  const [docId, setDocId] = useState("");

  useSetDoc("Products", uploadData, docId).then((resp) => {
    // redirect
    if (resp === true) navigate(`/product/${docId}`);
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
        <ProductForm
          buttonText="Create Product"
          setInputData={setUploadData}
          inputData={uploadData}
          onSubmit={createHandler}
        />
      </Grid>
    </Grid>
  );
};

export default CreateProduct;
