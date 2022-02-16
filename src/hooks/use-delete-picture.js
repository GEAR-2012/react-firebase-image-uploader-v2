import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useEffect } from "react";
import { db, storage } from "../firebase-config";

const useDeletePicture = (folder, documentId, documentName) => {
  useEffect(() => {
    if (folder && documentId && documentName) {
      // references
      try {
        const itemRef = ref(storage, `${folder}/${documentName}`);
        const docRef = doc(db, folder, documentId);
        // delete from storage
        deleteObject(itemRef)
          .then(() => {
            // console.log("Item deleted from firebase storage.");
          })
          .catch((error) => console.log(error.message));

        // delete from firestore
        deleteDoc(docRef)
          .then(() => {
            // console.log("Item deleted from firebase firestore.");
          })
          .catch((error) => console.log(error.message));
      } catch (error) {
        console.log(error);
      }
    }
  }, [folder, documentId, documentName]);
};

export default useDeletePicture;
