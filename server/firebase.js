// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
const  admin  = require('firebase-admin');
// const firebase = require('firebase');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Initialize Firebase
admin.initializeApp({credential:admin.credential.cert('private_key.json')});
let db=admin.firestore();
module.exports = db;