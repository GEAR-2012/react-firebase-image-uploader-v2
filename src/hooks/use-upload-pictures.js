import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { db, storage, timestamp } from "../firebase-config";
import { AppState } from "../state/app-context";

const uploadFn = async (folder, fileObj, setProgressArr, index) => {
  // get file object & file name from 'fileObj'
  const file = fileObj.file;
  const fileName = fileObj.name;

  // References
  const storageRef = ref(storage, `${folder}/${fileName}`);
  const collectionRef = collection(db, folder);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      setProgressArr((prevState) => {
        const newState = [...prevState];
        newState[index] = progress;
        return newState;
      });
    },
    (error) => {
      console.log(error.message);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const urlObj = { name: fileName, url: downloadURL, createdAt: timestamp() };
        addDoc(collectionRef, urlObj);
      });
    }
  );
};

const useUploadPictures = (folderName, fileListArr) => {
  const { setProgress } = AppState();
  const [fileCount, setFileCount] = useState(0);
  const [progressArr, setProgressArr] = useState([]);

  // gets the length of the 'fileListArr' & set it into a local state
  // & clean up fn resets the progress array
  useEffect(() => {
    // resetStates();
    if (fileListArr) {
      setFileCount(fileListArr.length);
    }
    return () => {
      setProgressArr([]);
    };
  }, [fileListArr]);

  // call picture uploader fn multiple times if necessary
  useEffect(() => {
    if (fileListArr && folderName) {
      fileListArr.forEach((fileObj, index) => {
        uploadFn(folderName, fileObj, setProgressArr, index);
      });
    }
  }, [fileListArr, folderName]);

  // calculate total progress & set into app state
  useEffect(() => {
    if (fileCount) {
      const progress = progressArr.reduce((a, b) => {
        return a + b;
      }, 0);

      setProgress(progress / fileCount);
    }
  }, [progressArr, fileCount, setProgress]);
};

export default useUploadPictures;
