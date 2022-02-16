import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import useUploadPictures from "../../hooks/use-upload-pictures";
import { AppState } from "../../state/app-context";
import { Typography } from "@mui/material";

const Input = styled("input")({
  display: "none",
});

export default function UploadButtons() {
  const { tempFolder, setFilesToUpload } = AppState();

  const [selectedFiles, setSelectedFiles] = useState("");

  useUploadPictures(tempFolder, selectedFiles);

  const inputChangeHandler = (e) => {
    const files = e.target.files;

    if (files) {
      // if one or more picture seleced
      // making a modified file array
      const fileArr = [];
      Object.values(files).forEach((file) => {
        // making unique filename
        // this way user can upload the same images multiple times
        const now = new Date();
        const unixTimeStamp = now.getTime();
        const newFileName = file.name + "_" + unixTimeStamp;
        // object wich will hold unique file name & the file itself
        const fileObj = { name: newFileName, file };
        fileArr.push(fileObj);
      });

      setSelectedFiles(fileArr); // it is trigger the 'useUploadPictures' hook
      // add the array from above to the 'filesToUpload' app state for final upload
      setFilesToUpload((prevState) => [...prevState, ...fileArr]);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
        Upload images
      </Typography>

      <label htmlFor="icon-button-file">
        <Input
          onChange={inputChangeHandler}
          accept="image/jpeg, image/png"
          id="icon-button-file"
          type="file"
          multiple
        />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </React.Fragment>
  );
}
