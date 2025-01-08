import { Authorize } from "./authorize.js";
import "@fortawesome/fontawesome-free/css/all.css";

// Ui
const signinform = document.getElementById('signinform');
const googleloginbtn = document.getElementById('googleloginbtn');

// Register

signinform.addEventListener('submit', (e) => {

        e.preventDefault();

        const signinemail = document.getElementById('signinemail').value.trim();
        const signinpassword = document.getElementById('signinpassword').value.trim();

        const { loginUser } = Authorize();
        loginUser(signinemail, signinpassword);

});



googleloginbtn.addEventListener('click', () => {

    const { googleLogin } = Authorize();
    googleLogin();
    
});