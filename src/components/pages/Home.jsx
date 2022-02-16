import React from "react";
import { Grid, Typography } from "@mui/material";
import useFirestoreListener from "../../hooks/use-firestore-listener";
import { AppState } from "../../state/app-context";
import ProgressCircular from "../UI/ProgressCircular";
import MasonryImageList from "../UI/MasonryImageGrid";

const Home = () => {
  const { imageFolder } = AppState();

  // get all pictures from firebase/firestore
  const { docs: previewImages, err } = useFirestoreListener(imageFolder);

  if (err) {
    console.log(err);
  }

  return (
    <Grid container spacing={5} sx={{ marginTop: 0 }}>
      <Grid item xs={12}>
        <Typography variant="h3">Home Page</Typography>
      </Grid>
      {!previewImages && (
        <Grid item xs={12}>
          <ProgressCircular />
        </Grid>
      )}
      {previewImages?.length > 0 && (
        <Grid item xs={12}>
          <MasonryImageList itemData={previewImages} />
        </Grid>
      )}
    </Grid>
  );
};

export default Home;
