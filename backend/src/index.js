import express from "express";
import cors from "cors";
import { PORT } from "./config/serverConfig.js";
import apiRouter from './routes/index.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api',apiRouter);




app.get("/ping", (req, res) => {
  res.json({message : "pong"});
});



app.listen(PORT, () => {
  console.log(`server is runnig on PORT ${PORT}`);
});
