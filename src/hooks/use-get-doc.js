import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";

const useGetDoc = (folderName, docId) => {
  const [returnData, setReturnData] = useState();

  useEffect(() => {
    const documentGetter = async (folder, id) => {
      // reference
      const docRef = doc(db, folder, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id };
      }
    };

    if (folderName && docId) {
      try {
        documentGetter(folderName, docId)
          .then((res) => setReturnData(res))
          .catch((err) => console.log(err.message));
      } catch (error) {
        console.log(error);
      }
    }
  }, [folderName, docId]);

  return returnData;
};

export default useGetDoc;
