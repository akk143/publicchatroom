import{A as m}from"./main-PGVoU9A6.js";const r=document.getElementById("signupform");r.addEventListener("submit",o=>{o.preventDefault();const e=document.getElementById("fullname").value.trim(),t=document.getElementById("email").value.trim(),n=document.getElementById("password").value.trim();console.log(e,t,n),m().registerUser(e,t,n)});
