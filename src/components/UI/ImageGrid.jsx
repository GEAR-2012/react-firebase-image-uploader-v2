import React, { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { IconButton, ImageListItemBar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeletePicture from "../../hooks/use-delete-picture";
import { AppState } from "../../state/app-context";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  img: {
    opacity: 0.8,
    "&:hover": {
      opacity: 1,
    },
    transition: "all 0.3s ease-in-out",
  },
});

const ImageGrid = ({ itemData, withItemBar }) => {
  const classes = useStyles();

  const { tempFolder, filesToUpload, setFilesToUpload } = AppState();

  const [docId, setDocId] = useState("");
  const [imageName, setImageName] = useState("");

  useDeletePicture(tempFolder, docId, imageName);

  const picDeleteHandler = (picture) => {
    // setting these two local states to trigger useDeletePicture hook
    setDocId(picture.id);
    setImageName(picture.name);
    // filtering out the deleted picture from 'filseToUpload' app state
    const newList = filesToUpload.filter((file) => {
      return file.name !== picture.name;
    });
    setFilesToUpload(newList);
  };

  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.id}>
          <img
            className={classes.img}
            src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
          />
          {withItemBar && (
            <ImageListItemBar
              title={item.name}
              actionIcon={
                <IconButton
                  onClick={() => picDeleteHandler(item)}
                  color="warning"
                  aria-label={`info about ${item.name}`}
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
          )}
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageGrid;
