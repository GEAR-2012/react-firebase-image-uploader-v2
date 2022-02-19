import React, { useState } from "react";
import { Box, Grid, Rating, Typography } from "@mui/material";
import useFirestoreListener from "../../hooks/use-firestore-listener";
import ProgressCircular from "../UI/ProgressCircular";
import ActionCard from "../UI/ActionCard";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  card: {
    transition: "transform 0.4s ease-in-out",
    "&:hover": {
      transform: "rotate(-3deg)",
      elevation: 3,
    },
  },
});

const Home = () => {
  const classes = useStyles();
  // get all pictures from firebase/firestore
  const { docs: products, err } = useFirestoreListener("Products");

  // console.log(products);

  if (err) {
    console.log(err);
  }

  const [value, setValue] = useState(3);

  return (
    <Grid container spacing={5} sx={{ marginTop: 0 }}>
      <Grid item xs={12}>
        <Typography variant="h3">Home Page</Typography>

        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Grid>
      {!products && (
        <Grid item xs={12}>
          <ProgressCircular />
        </Grid>
      )}
      {/* Products */}
      {products?.length > 0 && (
        <Grid item xs={12} style={{ display: "flex", gap: 30, justifyContent: "space-around", flexWrap: "wrap" }}>
          {products.map((product) => {
            const title = product.name;
            let url = "https://plchldr.co/i/260x260?bg=8291c3&text=No%20Picture";
            if (product.pictureList.length > 0) {
              url = product.pictureList[0].url;
            }
            const id = product.id;
            return (
              <Box key={product.id} className={classes.card}>
                <ActionCard title={title} url={url} id={id} />
              </Box>
            );
          })}
        </Grid>
      )}
    </Grid>
  );
};

export default Home;
