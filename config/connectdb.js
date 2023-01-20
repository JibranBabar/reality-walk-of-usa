// Require the NPM pakages that we need
const mongoose = require('mongoose');
// build the connection to the database
const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbName:"ReallityWalkOfUSA"
        }
        await mongoose.connect(DATABASE_URL , DB_OPTIONS)
        console.log('Connected Successfully..')
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDB;