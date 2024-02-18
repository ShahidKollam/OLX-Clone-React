import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyATe7MvObddPPqHd3L55HKoV6iZt07H5Hw",
  authDomain: "olx-clone-cf5a1.firebaseapp.com",
  projectId: "olx-clone-cf5a1",
  storageBucket: "olx-clone-cf5a1.appspot.com",
  messagingSenderId: "149316928550",
  appId: "1:149316928550:web:de8808846e9332db8712e7",
  measurementId: "G-RTP41QC7DE",
};

const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);
export const db = getFirestore(firebase);
export const storage = getStorage(firebase)

export default firebase;
