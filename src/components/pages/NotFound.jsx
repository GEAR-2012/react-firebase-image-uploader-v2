import React from "react";
import { Grid, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Grid container spacing={5} sx={{ marginTop: 0 }}>
      <Grid item xs={12}>
        <Typography variant="h1">404</Typography>
      </Grid>
    </Grid>
  );
};

export default NotFound;
