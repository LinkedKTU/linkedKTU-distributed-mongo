const { MongoClient } = require('mongodb');

const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let dbInstance = null;

async function connect() {
    if (dbInstance) {
        return dbInstance;  
    }
    try {
        await client.connect();
        console.log('MongoDB connected successfully');
        dbInstance = client.db(dbName);
        return dbInstance;
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

process.on('SIGINT', async () => {
    await client.close();
    console.log('MongoDB connection is disconnected due to application termination');
    process.exit(0);
});

module.exports = connect;
