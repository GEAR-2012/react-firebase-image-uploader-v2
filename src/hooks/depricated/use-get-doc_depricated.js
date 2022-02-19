import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";

const getDocument = async (collectionName, docId) => {
  let toReturn;
  const docRef = doc(db, collectionName, docId);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    toReturn = docSnap.data();
  } else {
    toReturn = "This document does not exists";
  }
  return toReturn;
};

const useGetDoc = (collectionName, docId) => {
  const [docObj, setDocObj] = useState(null);

  useEffect(() => {
    if (collectionName && docId) {
      try {
        getDocument(collectionName, docId)
          .then((res) => setDocObj(res))
          .catch((err) => {
            throw new Error(err.message);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [collectionName, docId]);

  if (docObj) return docObj;
};

export default useGetDoc;
