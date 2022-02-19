import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { IconButton, ImageListItemBar } from "@mui/material";
import { RiDeleteBin2Line } from "react-icons/ri";

const MasonryImageList = ({ itemData, onDelete }) => {
  return (
    <Box sx={{ width: "100%", height: 700, overflowY: "scroll" }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.url}>
            <img
              src={`${item.url}?w=248&fit=crop&auto=format`}
              srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              title={item.title}
              position="bottom"
              actionIcon={
                <IconButton onClick={() => onDelete(item)} sx={{ color: "white" }} aria-label={`star ${item.title}`}>
                  <RiDeleteBin2Line />
                </IconButton>
              }
              actionPosition="right"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default MasonryImageList;
