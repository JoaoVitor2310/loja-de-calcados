import mongoose from "mongoose";

const connectDatabse = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('Conectado ao banco de dados.')
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDatabse;