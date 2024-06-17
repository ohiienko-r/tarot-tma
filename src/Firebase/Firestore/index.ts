import { getFirestore } from "firebase/firestore";
import { app } from "@/Firebase/main";

export const db = getFirestore(app);
