import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log("Mongo conectado");

    } catch (e) {
        console.log(`Erro: ${ e.message }`);
        process.exit(1);
    }
};

export default connectDatabase;
