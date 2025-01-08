import { db } from './firebase.js';
import { collection, addDoc, onSnapshot, Timestamp, query, where, orderBy } from 'firebase/firestore';


export function Chatroom(room, username){

    let currrom = room;
    let curruser = username;
    const dbRef = collection(db, 'chats');
    let unsubscribe = null;

    const addChat = async (message) => {

        const now = new Date();

        const chatdata = {
            username:curruser,
            room:currrom,
            message,
            created_at:Timestamp.fromDate(now)
        };

        try{

            const response = await addDoc(dbRef, chatdata);
            return response;

        }catch(err){
            console.log("error addchat = ", err);
            throw err;
        }

    };

    const getChats = (callback) => {

        // onSnapshot(
        //     query(dbRef,where('room','==',currrom), orderBy('created_at'))
        //     , (docSnap) => {

        //     docSnap.forEach(doc => {
        //         // console.log(doc.data());
        //         callback(doc.data());
        //     });


        // if(unsubscribe){
        //     unsubscribe();
        // }


        if(unsubscribe) unsubscribe();

        unsubscribe = onSnapshot(
            query(dbRef,where('room','==',currrom), orderBy('created_at'))
            , (docSnap) => {

            docSnap.docChanges().forEach(item => {
                
                // console.log(item.doc.data());

                if(item.type === 'added'){
                    callback(item.doc.data());
                }

            });
            
        });

    };

    const updateChatroom = (newroom) => {
        currrom = newroom;
        console.log(`Room changed to ${currrom}`);
    };

    const updateUsername = (newusername) => {

        curruser = newusername;
        localStorage.setItem('username', curruser);

        console.log(`Username changed to ${curruser}`);
    };

    return { addChat, getChats, updateChatroom, updateUsername };
}