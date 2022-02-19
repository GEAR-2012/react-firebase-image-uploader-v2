import { useEffect, useState } from "react";
import { db, timestamp } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";

const useSetDoc = async (collectionName, docData, docId) => {
  const [created, setCreated] = useState(false);

  useEffect(() => {
    const taskSetDoc = async () => {
      // reference
      const docRef = doc(db, collectionName, docId);
      const createdAt = timestamp();
      await setDoc(docRef, { ...docData, createdAt });
      return true;
    };
    if (docId) {
      try {
        taskSetDoc().then(() => {
          setCreated(true);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [collectionName, docId, docData]);
  return created;
};

export default useSetDoc;
