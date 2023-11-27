import mongoose from "mongoose"

let isConnected = false

export const DBconnect = async() => {

    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log('MongoDB Already Connected');
        return;
    }
    
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true

        console.log("MongoDB Connected")
    } catch (error) {
        console.log("mitesh");
        console.log(error);
    }
}

 