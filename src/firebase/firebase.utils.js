import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDGFneGfTeDLWubkRs1cGIcbBaf_Nkt4ZM",
  authDomain: "crwn-db-807d8.firebaseapp.com",
  databaseURL: "https://crwn-db-807d8.firebaseio.com",
  projectId: "crwn-db-807d8",
  storageBucket: "crwn-db-807d8.appspot.com",
  messagingSenderId: "28650606190",
  appId: "1:28650606190:web:0ac8eab1859e9b07bb207f",
  measurementId: "G-5JM6EBXXGG",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exist) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creting user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
