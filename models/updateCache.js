const { db } = require("../utils/admin");
const { map } = require("../utils/hazelcast-client")

exports.cache = async (req, res) => {

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
};