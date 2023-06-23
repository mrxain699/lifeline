import { firestore as db } from "./DB";

const users = db().collection('users');
const bloodrequests = db().collection('bloodrequests');
const bloodtypes = db().collection('bloodtypes');
const urgentbloodrequests = db().collection('urgentbloodrequests');

export {
    users, 
    bloodrequests,
    bloodtypes,
    urgentbloodrequests
}
