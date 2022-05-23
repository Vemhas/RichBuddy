import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  addDoc,
  collection,
} from "firebase/firestore";
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

export const deletePortfolio = async (uid: string, portfolioName: string) => {
  const docRef = doc(db, "users", uid, "portfolios", portfolioName);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await deleteDoc(docRef);
    return true;
  } else {
    return false;
  }
};

export const addNewAsset = async (
  uid: string,
  portfolioName: string,
  name: string
) => {
  const docRef = doc(db, "users", uid, "portfolios", portfolioName);
  await addDoc(collection(docRef, "assets"), {
    name: name,
  });
};

export const getPortfolioData = async (
  uid: string,
  portfolioId: string
): Promise<Array<any>> => {
  const dataCollectionRef = collection(
    db,
    "users",
    uid,
    "portfolios",
    portfolioId,
    "assets"
  );

  const querySnapshot = await getDocs(dataCollectionRef);

  console.log("querySnapshot", querySnapshot);
  return querySnapshot.docs.map((_data) => ({
    name: _data.data().name,
  }));
};
