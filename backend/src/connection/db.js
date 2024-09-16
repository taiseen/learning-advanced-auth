import config from '../config/index.js';
import mongoose from "mongoose";


const dbConnection = async () => {

    try {

        await mongoose.connect(config.dbURL);
        console.log("Connected To MongoDB ==> OK ✅");

    } catch (error) {

        console.error("Connection Error 🟥", error);
		process.exit(1); // 1 is failure, 0 status code is success
        
    }
}

// mongoose.connection.on('disconnected', () => {
//     console.log('[Listener] ==> MongoDB Disconnected... 🟥');
// })

// mongoose.connection.on('connected', () => {
//     console.log('[Listener] ==> MongoDB Connected... ✅');
// })

export default dbConnection;