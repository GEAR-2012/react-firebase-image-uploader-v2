import { collection, deleteDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { deleteObject, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { db, storage } from "../firebase-config";

const useDeleteDoc = async (folderName, docId) => {
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    //
    const getPicturesFromDoc = (folder, id) => {
      const myPromise = new Promise(async (resolve, reject) => {
        const docRef = doc(db, folder, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const picList = docSnap.data().pictureList.map((item) => item.name);
          resolve(picList);
        } else {
          console.log("No such document!");
          reject(false);
        }
      });

      return myPromise;
    };
    //
    const deletePicturesFromStorage = async (folder, picNameList) => {
      const promiseArr = [];
      picNameList.forEach((pic) => {
        const itemRef = ref(storage, `${folder}/${pic}`);
        const deleteTask = deleteObject(itemRef);
        promiseArr.push(deleteTask);
      });
      Promise.all(promiseArr).then(() => {
        deleteOneDoc(docId);
      });
    };
    //
    const deleteOneDoc = (id) => {
      // doc reference
      const docRef = doc(db, folderName, id);
      deleteDoc(docRef);
    };
    //

    if (folderName && docId) {
      try {
        getPicturesFromDoc(folderName, docId)
          .then((list) => {
            return deletePicturesFromStorage(folderName, list);
          })
          .then(() => {
            setDeleted(true);
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  }, [folderName, docId]);
  return deleted;
};

export default useDeleteDoc;
