const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyANRMeU_v8-muWDUwx08UYhGPEpJC4JsKc",
    authDomain: "crud-database-5b7ff.firebaseapp.com",
    projectId: "crud-database-5b7ff",
    storageBucket: "crud-database-5b7ff.appspot.com",
    messagingSenderId: "711932908564",
    appId: "1:711932908564:web:f166face772d05f7248301",
    measurementId: "G-3Q6GHXG9GL"
};

firebase.initializeApp(firebaseConfig); //initialize firebase app
module.exports = { firebase }; //export the app