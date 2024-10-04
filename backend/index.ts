// Load config
import './config';

// App
import server from './server';

// Database
import db from './src/db';

const port = process.env.HTTP_PORT || 3001;
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/lod';

async function start() {
    try {
        // const sparqlData = await sparqlDB();
        // console.log('sparql Data: ', sparqlData[1].url)
        await db.MongoDB(mongoURL);
        server.listen(port, () => {
            console.log(`Server is listening to port: ${port}...`);
        })
    } catch(error) {
        console.log(`Server error: ${error}`)
    }
}

start();