import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./dataImport.js";
import productRoute from "./routes/productRoutes.js";
import userRoute from "./routes/userRoutes.js";

dotenv.config();
connectDatabase();

const app = express();
app.use(express.json());

app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

app.get("/", ( req, res ) => {
    res.send("API rodando...");
});

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`servidor rodando na porta ${ PORT }...`));