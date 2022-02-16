import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import PictureSelect from "../UI/PictureSelect";
import ProgressLinear from "../UI/ProgressLinear";
import ProgressCircular from "../UI/ProgressCircular";
import ImageGrid from "../UI/ImageGrid";
import useUploadPictures from "../../hooks/use-upload-pictures";
import useFirestoreListener from "../../hooks/use-firestore-listener";
import { AppState } from "../../state/app-context";

const Upload = () => {
  const { tempFolder, imageFolder, progress, filesToUpload, setFilesToUpload, setFoldersToDelete } = AppState();

  const [fileListToUpload, setFileListToUpload] = useState("");

  // get all pictures from firebase/firestore
  const { docs: previewImages, err } = useFirestoreListener("Temp");

  if (err) {
    console.log(err);
  }

  useUploadPictures(imageFolder, fileListToUpload);

  const uploadHandler = () => {
    if (filesToUpload.length > 0) {
      setFileListToUpload(filesToUpload); // trigger 'useUploadPictures' hook
      // reset
      setFoldersToDelete(tempFolder);
      setFilesToUpload([]);
    }
  };

  // clean up if page leaved
  useEffect(() => {
    return () => {
      setFoldersToDelete(tempFolder);
      setFilesToUpload([]);
    };
  }, [setFoldersToDelete, setFilesToUpload, tempFolder]);

  return (
    <Grid container spacing={5} sx={{ marginTop: 0 }}>
      <Grid item xs={12}>
        <Typography variant="h3">Upload Page</Typography>
      </Grid>
      <Grid item xs={12}>
        <PictureSelect />
      </Grid>
      {progress !== 0 && (
        <Grid item xs={12}>
          <ProgressLinear progress={progress} />
        </Grid>
      )}
      {!previewImages && (
        <Grid item xs={12}>
          <ProgressCircular />
        </Grid>
      )}
      {previewImages?.length > 0 && (
        <Grid item xs={12}>
          <ImageGrid itemData={previewImages} withItemBar={true} />
        </Grid>
      )}
      <Grid item xs={12}>
        <Button variant="contained" type="button" onClick={uploadHandler}>
          Upload Pictures
        </Button>
      </Grid>
    </Grid>
  );
};

export default Upload;
