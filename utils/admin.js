
var admin = require("firebase-admin");

var serviceAccount = require('C:\\Users\\djimemon\\WebstormProjects\\CRUD\\Server\\crud-database-5b7ff-firebase-adminsdk-8l1ht-414360bb4f.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = { admin, db };