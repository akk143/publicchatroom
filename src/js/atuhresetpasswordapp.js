import { Authorize } from "./authorize.js";

// Ui
const resetpassword = document.getElementById('resetpassword');
const msg = document.getElementById('msg');


// Reset Password
resetpassword.addEventListener('submit', (e) => {

        e.preventDefault();

        const { resetPassword } = Authorize();
        const resetemail = document.getElementById('resetemail').value.trim();

        resetPassword(resetemail, msg);

});
