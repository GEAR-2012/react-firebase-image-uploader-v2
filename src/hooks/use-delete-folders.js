import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { deleteObject, listAll, ref } from "firebase/storage";
import { useEffect } from "react";
import { db, storage } from "../firebase-config";

const useDeleteFolders = (folderName, setFoldersToDelete) => {
  useEffect(() => {
    const deleteFromStorage = () => {
      // list reference
      const listRef = ref(storage, folderName);
      listAll(listRef)
        .then((res) => {
          res.items.forEach((item) => {
            // item reference
            const itemRef = ref(storage, `${folderName}/${item.name}`);
            deleteObject(itemRef);
          });
        })
        .catch((error) => console.log(error.message));
    };

    const deleteOneDoc = (id) => {
      // doc reference
      const docRef = doc(db, folderName, id);
      deleteDoc(docRef);
    };

    const deleteFromFirestore = () => {
      // collection reference
      const collectionRef = collection(db, folderName);
      getDocs(collectionRef).then((docs) => {
        docs.forEach((doc) => {
          const id = doc.id;
          try {
            deleteOneDoc(id);
          } catch (err) {
            console.log(err);
          }
        });
      });
    };

    if (folderName) {
      try {
        deleteFromFirestore();
        deleteFromStorage();
        setFoldersToDelete("");
      } catch (err) {
        console.log(err);
      }
    }
  }, [folderName, setFoldersToDelete]);
};

export default useDeleteFolders;
