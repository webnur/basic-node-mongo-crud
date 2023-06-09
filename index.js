const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

//user name: bduser2
//password:  yYhjBC4Hmft1S5Hm




const uri = "there are will add database url";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('node-mongo-crud').collection('users');

        app.get('/users', async(req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users)
        });

        app.get('/users/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const user = await userCollection.findOne(query);
            res.send(user)

        });

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user)
            const result = await userCollection.insertOne(user)
            res.send(result)
        })

        app.put('/users/:id', async(req, res) => {
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const user = req.body;
            const option = {upsert: true}
            const updatedUser = {
                $set: {
                    name: user.name,
                    address: user.address,
                    email: user.email
                }
            }

            const result = await userCollection.updateOne(filter, updatedUser, option);
            res.send(result)

        })

        app.delete('/users/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
    
            const result = await userCollection.deleteOne(query)
            console.log(result);
            res.send(result)
        })

        // const user = {
        //     name: 'testing test',
        //     email: 'test@gamil.com'
        // }
        // const result = await userCollection.insertOne(user)
        // console.log(result)
    }
    finally {

    }
}

run().catch(error => console.log(error))



app.get('/', (req, res) => {
    res.send('Hello node mongo crud server')
})

app.listen(port, () => {
    console.log('Hello node mongo crud server')
})