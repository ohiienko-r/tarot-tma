import { app } from "../main";
import { getAuth, signInAnonymously, signOut } from "firebase/auth";

const auth = getAuth(app);

export const logIn = () => {
  signInAnonymously(auth)
    .then((user) => {
      console.log("Successfully logged in as anonymus!", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(`${errorCode}: ${errorMessage}`);
    });
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
