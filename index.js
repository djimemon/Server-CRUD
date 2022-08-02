const express = require('express');
const {users} = require('./models/users')

const app = express();

app.get('/', (req,res) => {
    res.send('Hola Mundo')
})


app.get('/users', users);



app.listen(4000, () => {
    console.log('El servidor esta funcionando')
})