import { auth, provider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth"
import Cookies from "universal-cookie"

const cookies = new Cookies()

export const Auth = (props) => {
    const {setIsAuth} = props
    const signInWithGoogle = async () => {
        try{
            const result = await signInWithPopup(auth, provider)
            cookies.set("auth-token", result.user.refreshToken)
            setIsAuth(true)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="auth">
            <h1> Sign In With Google To Continue </h1>
            <button onClick={signInWithGoogle}> Sign In With Google </button>
        </div>
    )
}