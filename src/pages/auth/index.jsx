import {auth, provider} from "../../config/firebase-config"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export const Auth = () => {
    const navigate = useNavigate();
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

    return <div className="login-page">
        <p>Sign in Google</p>
        <button className="login-google-btn" onClick={signInWithGoogle}>Sign In</button>
    </div>
}