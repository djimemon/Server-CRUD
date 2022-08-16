const express = require('express');
const {users} = require('./models/users')
const { Client } = require('hazelcast-client');
const {db} = require("./utils/admin");
const cors =require('cors');


const app = express();
app.use(cors())

    let map;

(async () => {
    const client = await Client.newHazelcastClient(createClientConfig());
    map = await client.getMap('someMap');

})().catch(err => {
    console.error('Error occurred:', err);
    process.exit(1);
});

function createClientConfig() {
    return {
        network: {
            hazelcastCloud: {
                discoveryToken: 'XzWgm1WU50BwF0nu5WALe2ZKqkIeVQm1EeQC7DFV2w202HWWft'
            }
        },
        clusterName: 'pr-3544',
        properties: {
            'hazelcast.client.statistics.enabled': true,
            'hazelcast.client.statistics.period.seconds': 1,
        }
    }
}



app.get('/', (req,res) => {
    res.send('Hola Mundo')
})


app.get('/users', users);

app.get('/test', (req,res) => {

    (async () => {


        if (await map.isEmpty()){

            const usersRef = db.collection('users');
            try{
                usersRef.get().then((snapshot) => {
                    const data = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    console.log(data);
                    //TODO post a la cache
                    return res.status(201).json(data);
                })
            } catch (error) {
                return res
                    .status(500)
                    .json({ general: "Something went wrong, please try again"});
            }

        }else {
            for(const [key, value] of await map.entrySet()){
                console.log('key:', key, 'value:', value);
            }

            return res.status(201).json(await map.get('cache'));
        }


    })().catch(err => {
        console.log(`An error occured: ${err}`);
    });
})

app.post('/test',(req, res) => {

    var body = '';

    req.on('data', data => {
        body += data;
    });

    req.on('end', ()=>{

        (async () => {
            var jsonObj = JSON.parse(body)
            await map.set("cache", jsonObj);
        })().catch(err => {
            console.log(`An error occured: ${err}`);
        });

        console.log(body);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end();
    })
})

app.post('/cache')



app.listen(4000, () => {
    console.log('El servidor esta funcionando')
})