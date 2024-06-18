import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { getQueryByUid } from "@/Firebase/Firestore";
import { StoredData } from "./types";

const useStoredData = (uid: string | undefined) => {
  const [storedData, setStoredData] = useState<StoredData | undefined>();

  useEffect(() => {
    if (!uid) return;

    const q = getQueryByUid(uid);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setStoredData(doc.data() as StoredData);
      } else {
        setStoredData(undefined);
      }
    });

    return unsubscribe;
  }, [uid]);

  return storedData;
};

export default useStoredData;
