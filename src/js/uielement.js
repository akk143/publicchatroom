import { format } from "date-fns";

export function UiElement(divele){

    const UserInfoEle = (data) => {

        const uid = data.uid;
        const email = data.email;
        const fullname = data.displayName;
        const photourl = data.photoURL;
        const createdtime = data.metadata.creationTime;

        // const getdate = new Date(createdtime).getDate();
        // const months = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        // const getmonth = new Date(createdtime).getMonths();
        // const getyear = new Date(createdtime).getFullYear();
        // const formatteddate = `${getdate} ${months[getmonth] ${getyear}}`;

        // CDN
        // const formatteddate = dateFns.format(new Date(createdtime), "do MMM yyyy");

        const formatteddate = format(new Date(createdtime), "do MMM yyyy");

        // console.log(formatteddate);


        const html = `
                        <img src="${photourl}" w="80" alt="profile icon" />
                        <p>UID : ${uid}}</p>
                        <p>Display Name : ${fullname}</p>
                        <p>Email : ${email}</p>
                        <p>Create At : ${formatteddate}</p>
                     `;

        divele.innerHTML = html;
        

    }

    return{UserInfoEle};

}