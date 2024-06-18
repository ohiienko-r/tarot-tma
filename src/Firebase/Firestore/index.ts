import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { app } from "@/Firebase/main";

export const db = getFirestore(app);

export const getQueryByUid = (uid: string | undefined) => {
  return query(collection(db, "users"), where("uid", "==", uid));
};

const getDocRefById = async (uid: string) => {
  try {
    const q = getQueryByUid(uid);
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      return docRef;
    }
  } catch (error) {
    throw new Error(`No document found with the given field value.`);
  }
};

export const updateBalance = async (
  newBalance: number | undefined,
  uid: string | undefined
) => {
  try {
    const docRef = await getDocRefById(uid as string);
    docRef && (await updateDoc(docRef, { balance: newBalance }));
  } catch (error) {
    throw new Error(`An error occured: ${error};`);
  }
};
