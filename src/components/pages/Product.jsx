import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MasonryImageList from "../UI/MasonryImageGrid";
import ProgressCircular from "../UI/ProgressCircular";
import useDeletePictureFromDoc from "../../hooks/use-delete-picture-from-doc";
import useFirestoreListener from "../../hooks/use-firestore-listener";
import PictureSelect from "../UI/PictureSelect";
import { AppState } from "../../state/app-context";
import ProgressLinear from "../UI/ProgressLinear";
import useDeleteDoc from "../../hooks/use-delete-doc";

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { progress } = AppState();

  const [picToDelete, setPicToDelete] = useState("");
  const [docIdToDelete, setDocIdToDelete] = useState("");

  const [docObj, setDocObj] = useState();

  const { docs: products, err } = useFirestoreListener("Products");
  useDeleteDoc("Products", docIdToDelete).then((resp) => {
    // redirect
    if (resp === true) navigate("/");
  });

  if (err) {
    console.log(err);
  }

  useEffect(() => {
    if (products) {
      setDocObj(
        products.find((prod) => {
          return prod.id === id;
        })
      );
    }
  }, [products, id]);

  useDeletePictureFromDoc("Products", id, picToDelete);

  const onDeletePictureHandler = (pic) => {
    setPicToDelete(pic);
  };

  const deleteProductHandler = () => {
    setDocIdToDelete(id);
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
            <Button onClick={deleteProductHandler} variant="contained" color="error">
              Delete This Product
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
          {docObj.pictureList.length > 0 && (
            <Grid item xs={12}>
              <MasonryImageList itemData={docObj.pictureList} onDelete={onDeletePictureHandler} />
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default Product;
