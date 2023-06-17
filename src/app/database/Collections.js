import { firestore as db } from "./DB";

const users = db().collection('users');
const bloodrequests = db().collection('bloodrequests');

export {
    users, 
    bloodrequests
}
