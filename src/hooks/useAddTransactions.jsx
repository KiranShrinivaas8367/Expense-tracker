import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransactions = () => {
    const transactionCollectionRef = collection(db, "tranactions");
    const { userID,name,profile,isAuth } = useGetUserInfo();
    const addTransaction = async(
        {description, 
        transactionAmount, 
        transactionType}) => {
        await addDoc(transactionCollectionRef, {
            userID,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp()
        });
    };
    return{ addTransaction }
}