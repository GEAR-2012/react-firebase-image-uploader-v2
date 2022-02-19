import { useEffect, useState } from "react";
import { db, timestamp } from "../firebase-config";
import { doc, updateDoc } from "firebase/firestore";

const useUpdateDoc = async (folderName, docId, docData) => {
  // docData = objec of key-value pair(s)
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const documentUpdate = async (folder, id, data) => {
      // reference
      const docRef = doc(db, folder, id);
      await updateDoc(docRef, { ...data, updatedAt: timestamp() });
    };

    if (folderName && docId && docData) {
      try {
        documentUpdate(folderName, docId, docData)
          .then(() => setIsUpdated(true))
          .catch((err) => console.log(err.message));
      } catch (error) {
        console.log(error);
      }
    }
  }, [folderName, docId, docData]);
  return isUpdated;
};

export default useUpdateDoc;
