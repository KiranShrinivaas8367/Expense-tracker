import { useEffect, useState } from "react"
import { query,collection, where, orderBy, onSnapshot, doc } from "firebase/firestore"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo"
// import { unsubscribe } from "firebase/data-connect"

export const useGetTransactions = () => 
    {
        const [transactions, setTransactions] = useState([])//docs is an array again pushing in transactions array
        const [transactionTotals, setTransactionTotals] = useState({
                balance: 0.0,
                income: 0.0, 
                expenses:0.0
            });
        const transactionCollectionRef = collection(db,"tranactions")
        const { userID } = useGetUserInfo();

        const getTransactions = () => 
        {
            let unsubscribe;
            try
            {
                const queryTransactions = query(
                    transactionCollectionRef,
                    where("userID", "==", userID),
                    orderBy("createdAt")
                );

                console.log(queryTransactions)

                unsubscribe = onSnapshot(queryTransactions, (snapshot) =>{
                    console.log(snapshot);
                    let docs = [];//empty array declaration
                    let totalIncome = 0;
                    let totalExpenses = 0;
                
                    snapshot.forEach((doc) => {
                        // console.log(doc.data())
                        const data = doc.data();
                        const id = doc.id;
                        console.log(data)

                        docs.push({...data, id});

                        if(data.transactionType == 'expense')
                            totalExpenses+=Number(data.transactionAmount);
                        else
                            totalIncome+=Number(data.transactionAmount);
                    });

                    console.log(docs)
                    setTransactions(docs);

                    let balanceAmt = totalIncome - totalExpenses;
                    setTransactionTotals({
                        balance: balanceAmt,
                        income:totalIncome,
                        expenses:totalExpenses
                    });
                });
            } 
            catch(error){
                console.error(error);        
            }

            return () => unsubscribe();
        };

        useEffect(() => {
            return getTransactions();
            
        }, [])
        console.log(transactions)
        
        return { transactions, transactionTotals };
}