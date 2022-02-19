import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import ProductForm from "../forms/ProductForm";
import useUpdateDoc from "../../hooks/use-update-doc";
import useGetDoc from "../../hooks/use-get-doc";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // this state holds the product datas
  const initUpdatedData = { name: "", price: "" };
  const [updatedData, setUpdatedData] = useState(initUpdatedData);
  const [docId, setDocId] = useState("");

  const returnData = useGetDoc("Products", id);

  useEffect(() => {
    if (returnData) {
      const name = returnData.name;
      const price = returnData.price;
      setUpdatedData({ name, price });
    }
  }, [returnData]);

  useUpdateDoc("Products", docId, updatedData).then((resp) => {
    if (resp) {
      navigate(`/product/${id}`);
    }
  });

  const updateHandler = () => {
    setDocId(id); // trigger 'useUpdateDoc' hook
  };

  return (
    <Grid container spacing={5} sx={{ marginTop: 0 }}>
      <Grid item xs={12}>
        <Typography variant="h3">Update this Product</Typography>
      </Grid>
      <Grid item xs={12}>
        <ProductForm
          buttonText="Update Product"
          setInputData={setUpdatedData}
          inputData={updatedData}
          onSubmit={updateHandler}
        />
      </Grid>
    </Grid>
  );
};

export default UpdateProduct;
