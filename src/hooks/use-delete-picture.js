import { useEffect } from "react";
import { db, storage, timestamp } from "../firebase-config";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const useDeletePicture = (folderName, docId, pic) => {
  useEffect(() => {
    const deleteFromFirestore = (folder, id, url, name) => {
      // reference
      const docRef = doc(db, folder, id);
      const arrItem = { name, url };
      updateDoc(docRef, {
        pictureList: arrayRemove(arrItem),
        updatedAt: timestamp(),
      });
    };

    const deleteFromStorage = (folder, name) => {
      // reference
      const objRef = ref(storage, `${folder}/${name}`);
      deleteObject(objRef);
    };

    if (folderName && docId && pic) {
      try {
        deleteFromFirestore(folderName, docId, pic.url, pic.name);
        deleteFromStorage(folderName, pic.name);
      } catch (err) {
        console.log(err);
      }
    }
  }, [folderName, docId, pic]);
};

export default useDeletePicture;
