import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const useFirestoreListener = (folderName) => {
  const [docs, setDocs] = useState();
  const [err, setErr] = useState("");

  useEffect(() => {
    let unsub;
    try {
      // reference
      const collectionRef = collection(db, folderName);
      // query
      const q = query(collectionRef, orderBy("createdAt", "desc"));
      // listener
      unsub = onSnapshot(q, (snapshot) => {
        const documents = [];
        snapshot.forEach((doc) => {
          const docObj = { ...doc.data(), id: doc.id };
          documents.push(docObj);
        });
        setDocs(documents);
      });
    } catch (error) {
      setErr(error);
    }

    return unsub;
  }, [folderName]);

  return { docs, err };
};

export default useFirestoreListener;
