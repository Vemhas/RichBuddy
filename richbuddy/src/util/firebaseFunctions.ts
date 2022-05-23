import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export const addPortfolio = async (portfolioName: string, uid: string) => {
  const docRef = doc(db, "users", uid, "portfolios", portfolioName);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return false;
  } else {
    await setDoc(doc(db, "users", uid, "portfolios", portfolioName), {
      name: portfolioName,
      sharedWithUsers: "vigbjørn",
    });
    return true;
  }
};

// export const addNewAsset = () => {
//   const docRef = doc(db, "users");
// };
