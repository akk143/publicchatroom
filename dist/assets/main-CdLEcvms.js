import{c as L,d as T,T as O,a as Y,o as E,q as $,b as A,w as H,g as F,e as N,f as U}from"./main-PGVoU9A6.js";import{t as g,n as v,g as I,m as C,a as y,e as z,b as R}from"./en-US-jiSuZHIs.js";/* empty css            */function j(r,t){let e=r,a=t;const n=L(T,"chats");let o=null;const i=async f=>{const c=new Date,u={username:a,room:e,message:f,created_at:O.fromDate(c)};try{return await Y(n,u)}catch(l){throw console.log("error addchat = ",l),l}},s=f=>{o&&o(),o=E($(n,H("room","==",e),A("created_at")),c=>{c.docChanges().forEach(u=>{u.type==="added"&&f(u.doc.data())})})},m=f=>{e=f},d=f=>{a=f,localStorage.setItem("username",a),console.log(`Username changed to ${a}`)};return(()=>{let f=setInterval(async()=>{try{const c=await F(n);if(c.empty){clearInterval(f);return}c.docs.forEach(async u=>{await N(U(T,"chats",u.id))})}catch(c){console.error("Error deleting messages: ",c)}},15e3)})(),{addChat:i,getChats:s,updateChatroom:m,updateUsername:d}}function x(r,t){const e=+g(r)-+g(t);return e<0?-1:e>0?1:e}function k(r,t,e){const[a,n]=v(e==null?void 0:e.in,r,t),o=a.getFullYear()-n.getFullYear(),i=a.getMonth()-n.getMonth();return o*12+i}function G(r){return t=>{const a=(r?Math[r]:Math.trunc)(t);return a===0?0:a}}function B(r,t){return+g(r)-+g(t)}function J(r,t){const e=g(r,t==null?void 0:t.in);return e.setHours(23,59,59,999),e}function K(r,t){const e=g(r,t==null?void 0:t.in),a=e.getMonth();return e.setFullYear(e.getFullYear(),a+1,0),e.setHours(23,59,59,999),e}function P(r,t){const e=g(r,t==null?void 0:t.in);return+J(e,t)==+K(e,t)}function Q(r,t,e){const[a,n,o]=v(e==null?void 0:e.in,r,r,t),i=x(n,o),s=Math.abs(k(n,o));if(s<1)return 0;n.getMonth()===1&&n.getDate()>27&&n.setDate(30),n.setMonth(n.getMonth()-i*s);let m=x(n,o)===-i;P(a)&&s===1&&x(a,o)===1&&(m=!1);const d=i*(s-+m);return d===0?0:d}function V(r,t,e){const a=B(r,t)/1e3;return G(e==null?void 0:e.roundingMethod)(a)}function W(r,t,e){const a=R(),n=(e==null?void 0:e.locale)??a.locale??z,o=2520,i=x(r,t);if(isNaN(i))throw new RangeError("Invalid time value");const s=Object.assign({},e,{addSuffix:e==null?void 0:e.addSuffix,comparison:i}),[m,d]=v(e==null?void 0:e.in,...i>0?[t,r]:[r,t]),h=V(d,m),f=(I(d)-I(m))/1e3,c=Math.round((h-f)/60);let u;if(c<2)return e!=null&&e.includeSeconds?h<5?n.formatDistance("lessThanXSeconds",5,s):h<10?n.formatDistance("lessThanXSeconds",10,s):h<20?n.formatDistance("lessThanXSeconds",20,s):h<40?n.formatDistance("halfAMinute",0,s):h<60?n.formatDistance("lessThanXMinutes",1,s):n.formatDistance("xMinutes",1,s):c===0?n.formatDistance("lessThanXMinutes",1,s):n.formatDistance("xMinutes",c,s);if(c<45)return n.formatDistance("xMinutes",c,s);if(c<90)return n.formatDistance("aboutXHours",1,s);if(c<C){const l=Math.round(c/60);return n.formatDistance("aboutXHours",l,s)}else{if(c<o)return n.formatDistance("xDays",1,s);if(c<y){const l=Math.round(c/C);return n.formatDistance("xDays",l,s)}else if(c<y*2)return u=Math.round(c/y),n.formatDistance("aboutXMonths",u,s)}if(u=Q(d,m),u<12){const l=Math.round(c/y);return n.formatDistance("xMonths",l,s)}else{const l=u%12,S=Math.trunc(u/12);return l<3?n.formatDistance("aboutXYears",S,s):l<9?n.formatDistance("overXYears",S,s):n.formatDistance("almostXYears",S+1,s)}}function Z(r){return{newli:a=>{const n=W(a.created_at.toDate(),new Date,{addSuffix:!0}),o=`
                        <li class="shadow rounded-lg px-4 py-2">
                            <div class="flex justify-between">
                                <h5 class="text-gray-600 font-medium text-sm">${a.username}</h5>
                                <i class="text-gray-300 text-xs">${n}</i>
                            </div>
                            <p class="text-gray-600 text-sm">${a.message}</p>
                        </li>
                     `;r.innerHTML+=o},resetli:()=>{r.innerHTML=""}}}const p=document.querySelector(".chatrooms"),ee=document.querySelector(".chat-ul"),w=document.querySelector(".chat-form"),D=document.querySelector(".user-form"),_=document.querySelector(".msg"),X=document.querySelector(".roomtitle"),q=localStorage.username?localStorage.username:"Guest";D.username.placeholder=`username is ${q}`;const M=j("general",q);X.textContent="General";const b=Z(ee);w.addEventListener("submit",r=>{r.preventDefault();const t=w.message.value.trim();M.addChat(t).then(()=>w.reset()).catch(e=>console.log(e))});D.addEventListener("submit",r=>{r.preventDefault();const t=D.username.value.trim();M.updateUsername(t),D.reset(),_.innerText=`New name updated to ${t}`,D.username.placeholder=`username is ${t}`,setTimeout(()=>_.innerText="",3e3)});p.addEventListener("click",r=>{r.preventDefault();const t=r.target.closest("button");if(t){b.resetli();const e=t.getAttribute("id"),a=t.querySelector("h3").innerText;X.textContent=a,M.updateChatroom(e),M.getChats(n=>{b.newli(n)})}});M.getChats(r=>{b.newli(r)});
