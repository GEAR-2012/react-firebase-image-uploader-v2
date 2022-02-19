import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    gap: theme.spacing(2),
  },
}));

const ProductForm = ({ uploadData, setUploadData }) => {
  const classes = useStyles();

  const changeHandler = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setUploadData((prevState) => ({ ...prevState, [id]: value }));
  };

  return (
    <form className={classes.form}>
      <TextField
        value={uploadData.name}
        onChange={changeHandler}
        id="name"
        size="small"
        variant="outlined"
        label="Product Name"
      />
      <TextField
        value={uploadData.price}
        onChange={changeHandler}
        id="price"
        size="small"
        variant="outlined"
        label="Price"
      />
    </form>
  );
};

export default ProductForm;
