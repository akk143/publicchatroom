import { db } from './firebase.js';
import { collection, addDoc, onSnapshot, Timestamp, query, where, orderBy, deleteDoc, getDocs, doc } from 'firebase/firestore';


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
        // console.log(`Room changed to ${currrom}`);
    };

    const updateUsername = (newusername) => {

        curruser = newusername;
        localStorage.setItem('username', curruser);

        console.log(`Username changed to ${curruser}`);
    };

    // Delete all messages every 15s

    const deleteAllmessages = () => {
        
        let deleteinter = setInterval(async() => {

           try{
                const getdatas = await getDocs(dbRef);

                if(getdatas.empty){

                    clearInterval(deleteinter);

                    return;
                }

                getdatas.docs.forEach(async(getdata) => {
                    await deleteDoc(doc(db, 'chats', getdata.id));

                });

           }catch(error){
                console.error("Error deleting messages: ", error);
           }
            
        }, 15000);
    }

    // deleteAllmessages();

    return { addChat, getChats, updateChatroom, updateUsername };
    
}