import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export function Authorize(){

    // Signup
    const registerUser = async (fullname, email, password) => {

        const defaultimg = "https://static.thenounproject.com/png/65476-200.png";

        try{

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // console.log(user);

            await updateProfile(user, {
                displayName: fullname, 
                photoURL: defaultimg 
              }).then(() => {

                // set name to localstorage
                setLocalName(user);

                // Redirect to index.html
                window.location.href = "../index.html";
              });

        }catch(error){
            console.log("Error registering : ", error);
        }
 
    }

    // Signin
    const loginUser = (email, password) => {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                // set name to localstorage
                setLocalName(userCredential.user);

                // Redirect to index.html
                window.location.href = "../index.html";

            })
            .catch((error) => {
                console.log("Error logging in : ", error.message);
            });

    }

    // Signout
    const logoutUser = () => {

        signOut(auth)
            .then(() => {

                // unset name to localstorage
                unsetLocalName();

                window.location.href = "../signin.html";
            }).catch((error) => {
                console.error("Error logging out = ", error.message);
            });

    }

    // Reset password
    const resetPassword = async(email, msg) => {

        try{

            await sendPasswordResetEmail(auth, email);

            msg.textContent = "Password reset email send, Please check your inbox.";
            msg.style.color = "green";
            msg.style.fontSize = "11px";

        }catch{
            console.error("Error sending password reset email = ", error.message);

            msg.textContent = `Error : ${error.message}`;
            msg.style.color = "red";
            msg.style.fontSize = "11px";

        }
        
    }

    // Google Signin
    const googleLogin = () => {

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {

            // set name to localstorage
            setLocalName(result.user.displayName);

            // Redirect to index.html
            window.location.href = "../index.html";
        }).catch((error) => {
            console.error("Error logging out = ", error.message);
        });

    }

    // Auth Check
    const isLoggedIn = () => {

        onAuthStateChanged(auth, (userdata) => {

            if(userdata){
                return true;
            }else{
                // Redirect to index.html
                window.location.href = "../signin.html";
            }
            
        });

    }

    // Get User Info

    const getUser = (callback) => {

        // callback("hello sir");

        onAuthStateChanged(auth, (userdata) => {

            if(userdata){
                callback(userdata);
            }

        });

    }

    const setLocalName = (userdata) => {
        localStorage.setItem('username', userdata.displayName);
    }

    const unsetLocalName = () => {
        localStorage.removeItem('username');
    }

    return { registerUser, loginUser, logoutUser, resetPassword, googleLogin, isLoggedIn, getUser }

}