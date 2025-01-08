import { Authorize } from "./authorize.js";
import { UiElement } from "./uielement.js";

// Ui
const userinfodiv = document.getElementById('userinfo');
const logoutbtn = document.getElementById('logoutbtn');


// Uielement instance
const uiele = UiElement(userinfodiv);


// Authorize instance
const authorize = Authorize();


// Get Info & Render
authorize.getUser((data) => {

    // console.log(data);

    uiele.UserInfoEle(data);

});


// Logout
logoutbtn.addEventListener('click', (e) => {

    const { logoutUser } = Authorize();
    logoutUser();

});