import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

// export const getSignedInUser = () => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       console.log("UserInfo:", user);
//       return user;
//       // ...
//     } else {
//       console.log("No user logged in at the moment...");
//     }
//   });
// };

export const useAuth = () => {
  // Måtte til slutt bruke any. forstår ikke hvorfor User(firebase sitt Interface) eller andre måter, ikke funker:(
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      return user ? setCurrentUser(user) : setCurrentUser(null);
    });
    return unsub();
  }, []);

  return currentUser;
};
