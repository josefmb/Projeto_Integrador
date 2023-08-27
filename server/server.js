import express, { response } from "express";
import dotenv from "dotenv";
import multer from "multer";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./dataImport.js";
import productRoute from "./routes/productRoutes.js";
import userRoute from "./routes/userRoutes.js";
// import email from "./email/nodemail.js";
// import sendEmail from "./email/nodemail.js";

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

// const upload = multer();
// app.post('/send', (req, res, next) => {
//     const nome = req.body.nome;
//     const email = req.body.email;
//     const mensagem = req.body.mensagem;

//     sendEmail(email, nome, mensagem)
//         .then(response => res.json(response))
//         .catch(error => res.json(error));
// })

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`servidor rodando na porta ${ PORT }...`));