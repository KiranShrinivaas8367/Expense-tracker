import { useAddTransactions } from "../../hooks/useAddTransactions"
import { useState } from "react";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import "./style.css"
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

export const ExpenseTracker = () => {
    const { addTransaction } = useAddTransactions();
    const { transactions, transactionTotals } = useGetTransactions();
    // console.log(transactions)
    const {name, profilePhoto} = useGetUserInfo();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");
    
    const {balance, income, expenses} = transactionTotals;

    const formSubmit =  (e) => {
        e.preventDefault();
        addTransaction({
            description, 
            transactionAmount, 
            transactionType
        });

        setDescription("");
        setTransactionAmount("");
    };

    const signUserOut = async() => {
        try
        {
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return (
    <>
        <div className="expense-tracker">
            <div className="container">
                <h1>{name}'s Expense-tracker</h1>

                <div className="balance">
                    <h1>Current Balance</h1>
                    {balance>=0 ? 
                    (<h2>${balance}</h2>):
                    (<h2>-${-1*balance}</h2>)}
                    
                </div>

                <div className="summary">
                    <div className="income">
                        <h4>Income</h4>
                        <p>${income}</p>
                    </div>

                    <div className="expenses">
                        <h4>Expenses</h4>
                        <p>${expenses}</p>
                    </div>
                </div>

                <form action="" className="add-transaction" onSubmit={formSubmit}>
                    <input 
                    type="text"
                    placeholder="Description..." 
                    value={description}
                    required
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}/>

                    <input 
                    type="nubmer" 
                    placeholder="Amount"
                    value={transactionAmount}
                    required 
                    onChange={(e) => {
                        setTransactionAmount(e.target.value)
                    }}/>

                    <input 
                    type="radio" 
                    id="expense" 
                    value="expense" 
                    checked={transactionType === "expense"}
                    onChange={(e) => setTransactionType(e.target.value)}/>
                    <label htmlFor="expense">Expense</label>

                    <input 
                    type="radio" 
                    id="income" 
                    value="income" 
                    checked={transactionType === "income"}
                    onChange={(e) => setTransactionType(e.target.value)}/>
                    <label htmlFor="income">Income</label>

                    <button type="submit">Add Transaction</button>
                </form>
            </div>

            {profilePhoto && <div className="profile"> 
            <img className="profile-photo" src={profilePhoto} alt="" />
            <button className="sign-out-button" onClick={signUserOut}>
                Sign Out
            </button>
            </div>}

        </div>

        <div className="transactions">
            <h2>Transactions</h2>
            <ul>
                {transactions.map((transaction) => {
                    // console.log(transaction)
                    const labelColor = transactionType === "income" ? "green": "red";
                    return <li>
                        <h4 >{transaction.description}</h4>
                        <p>{transaction.transactionAmount} • <label style={{color: labelColor}}> {transaction.transactionType} </label>
                        </p>
                        </li>
                })}
            </ul>
        </div>
    </>
    )
}