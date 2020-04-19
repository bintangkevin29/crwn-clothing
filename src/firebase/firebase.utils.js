import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { batch } from "react-redux";

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  console.log(objectsToAdd);
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collectionsSnapshot) => {
  const transformedCollection = collectionsSnapshot.docs.map((docSnapshot) => {
    const { title, items } = docSnapshot.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docSnapshot.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;