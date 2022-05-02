import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCGVubB4voXluWnO0kheyxtLhAB5XTl4S0",
  authDomain: "richb-a1b20.firebaseapp.com",
  databaseURL: "https://richb-a1b20-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "richb-a1b20",
  storageBucket: "richb-a1b20.appspot.com",
  messagingSenderId: "276583882899",
  appId: "1:276583882899:web:706fbfc8044b18d2afad66",
  measurementId: "G-GFEEQMGN2S"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
