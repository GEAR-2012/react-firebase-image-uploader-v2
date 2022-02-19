import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ProgressCircular = () => {
  return (
    <Box sx={{ display: "flex", padding: "4rem 0" }}>
      <CircularProgress color="secondary" thickness={6} size={120} sx={{ margin: "0 auto" }} />
    </Box>
  );
};

export default ProgressCircular;
