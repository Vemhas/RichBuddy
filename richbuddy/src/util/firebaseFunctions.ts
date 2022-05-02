import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    updateDoc,
} from "firebase/firestore";
import { db } from "./firebase-config";

const usersCollectionRef = collection(db, 'users');
const portfolioDocumentRef = doc(db, 'users', "portfolios");

// export const createSanghefte = async (docName: string, userID: string) => {
//     const docRef = doc(db, "BrukerID", userID, "sanghefter", docName);
//     const docSnap = await getDoc(docRef);
//     if (!docSnap.exists()) {
//         await setDoc(doc(db, "BrukerID", userID, "sanghefter", docName), {});
//     }
// };

export const addPortfolio = async (portfolioName: string, uid: string) => {
    const docRef = doc(db,"users", uid, "portfolios", portfolioName)
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        console.log("document already exists")
        return false;
    }else {
        await setDoc(doc(db, "users", uid, "portfolios", portfolioName), {
            sharedWithUsers: "vigbjørn"
        }).then( () => {
            console.log("Suksess! vi lagde et nytt portfolio")
        });
        return true;
    }
}

// export const addNewAsset = () => {
//
// }

