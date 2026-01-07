import {auth, provider} from "../../config/firebase-config"
import { signInWithPopup } from "firebase/auth"
import { useNavigate, Navigate } from "react-router-dom"
import "./style.css";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useEffect } from "react";

export const Auth = () => {
    const navigate = useNavigate();
    const {isAuth} = useGetUserInfo();
    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider);
        // console.log(results.user.displayName);
        const authinfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true
        };
        localStorage.setItem("auth", JSON.stringify(authinfo));
        navigate("/expense-tracker");
    }

    if(isAuth)
        return <Navigate to="/expense-tracker" />;

        return <div className="login-page">
            <p>Sign in Google</p>
            <button className="login-google-btn" onClick={signInWithGoogle}>Sign In</button>
        </div>
    
    //     if(isAuth)
    //         navigate("expense-tracker")
    //     else
    //     {
    //         <div className="login-page">
    //         <p>Sign in Google</p>
    //         <button className="login-google-btn" onClick={signInWithGoogle}>Sign In</button>
    //     </div>
    //     }

}