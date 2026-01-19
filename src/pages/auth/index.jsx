import {auth, provider} from "../../config/firebase-config"
import { signInWithPopup } from "firebase/auth"
import { useNavigate, Navigate } from "react-router-dom"
import "./style_auth.css";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";


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

        return (
        <div className="login-page">
            {/* <h2>SmartSpend</h2>
            <p>Sign in Google</p>
            <button className="login-google-btn" onClick={signInWithGoogle}>Sign in with Google</button> */}
            
    
        <div className="signup-container">
            <div className="signup-header">
                <h1 className="signup-title">Smart Spend</h1>
            </div>
        
            <div className="social-buttons">
                <button className="social-btn" onClick={signInWithGoogle}>
                    <svg class="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                </button>
            </div>

            <p className="terms-text">
                By creating an account, you can track your money wisely
            </p>
        </div>
    </div>
        )
    
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