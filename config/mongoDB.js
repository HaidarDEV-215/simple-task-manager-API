const { mongoose } = require('mongoose');

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB dataBase is connecting...`);
    } catch (error) {
        console.log('error connection accuired\n', error.message);
        process.exit(1);
    }
}

module.exports = connectToDb;

/**
 * await mongoose.connect(process.env.MONGO_URL)
        .catch((error) => {
            console.log('error connection accuired\n', error.message);
        })
        .then(() => {
            console.log(`dataBase connected successfully`);
        })
 */