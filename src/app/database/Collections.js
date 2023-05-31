import { firestore as db } from "./DB";

const users = db().collection('users');

export {users}