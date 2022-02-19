import { Button, TextField } from "@mui/material";
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

const ProductForm = ({ inputData, setInputData, buttonText, onSubmit }) => {
  const classes = useStyles();

  const changeHandler = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setInputData((prevState) => ({ ...prevState, [id]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <TextField
        value={inputData.name}
        onChange={changeHandler}
        id="name"
        size="small"
        variant="outlined"
        label="Product Name"
      />
      <TextField
        value={inputData.price}
        onChange={changeHandler}
        id="price"
        size="small"
        variant="outlined"
        label="Price"
      />
      <Button type="submit" variant="contained" sx={{ marginTop: "1rem" }}>
        {buttonText}
      </Button>
    </form>
  );
};

export default ProductForm;
