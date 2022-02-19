import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import SellIcon from "@mui/icons-material/Sell";
import MasonryImageList from "../UI/MasonryImageGrid";
import ProgressCircular from "../UI/ProgressCircular";
import PictureSelect from "../UI/PictureSelect";
import ProgressLinear from "../UI/ProgressLinear";
import useDeleteDoc from "../../hooks/use-delete-doc";
import useFirestoreListener from "../../hooks/use-firestore-listener";
import useDeletePicture from "../../hooks/use-delete-picture";
import sortByFileName from "../functions/sortByFileName";
import { AppState } from "../../state/app-context";

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { progress, setProgress, currency } = AppState();

  const [picToDelete, setPicToDelete] = useState("");
  const [docIdToDelete, setDocIdToDelete] = useState("");
  const [docObj, setDocObj] = useState();
  const [picList, setPicList] = useState();

  // extract pictures from 'docObj' to sort by name
  useEffect(() => {
    if (docObj) {
      const sortedPictures = sortByFileName(docObj.pictureList);

      setPicList(sortedPictures);
    }
  }, [docObj]);

  // get all document from a collection
  const { docs: products, err } = useFirestoreListener("Products");

  if (err) {
    console.log(err);
  }

  // custom hook to delete a document
  useDeleteDoc("Products", docIdToDelete).then((resp) => {
    // redirect
    if (resp === true) {
      navigate("/");
    }
  });

  // custom hook to delete one picture
  useDeletePicture("Products", id, picToDelete);

  // find the actual product in products
  // & display it to the screen
  useEffect(() => {
    if (products) {
      let product = products.find((prod) => prod.id === id);
      setDocObj(product);
    }
  }, [products, id]);

  // clean up effect
  useEffect(() => {
    return () => {
      setProgress(0);
    };
  }, [setProgress]);

  const onDeletePictureHandler = (pic) => {
    setPicToDelete(pic);
  };

  const deleteProductHandler = () => {
    setDocIdToDelete(id);
  };

  const updateProductHandler = () => {
    navigate(`/product_update/${id}`);
  };

  return (
    <Grid container spacing={5} sx={{ marginTop: 0 }}>
      {!docObj && (
        <Grid item xs={12}>
          <ProgressCircular />
        </Grid>
      )}

      {docObj && (
        <>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
              {docObj.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
              {currency}
              {docObj.price} <SellIcon sx={{ color: "green" }} />
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", gap: "1rem" }}>
            <Button onClick={deleteProductHandler} variant="contained" color="error">
              Delete This Product
            </Button>
            <Button onClick={updateProductHandler} variant="contained">
              Update This Product
            </Button>
          </Grid>
          <Grid item xs={12}>
            <PictureSelect folderName="Products" docId={id} />
          </Grid>
          {progress !== 0 && (
            <Grid item xs={12}>
              <ProgressLinear progress={progress} />
            </Grid>
          )}
          {picList && (
            <Grid item xs={12}>
              <MasonryImageList itemData={picList} onDelete={onDeletePictureHandler} />
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default Product;
