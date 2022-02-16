import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const MasonryImageList = ({ itemData }) => {
  return (
    <Box sx={{ width: "100%", height: 700, overflowY: "scroll" }}>
      <ImageList variant="masonry" cols={4} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={`${item.url}?w=248&fit=crop&auto=format`}
              srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default MasonryImageList;
