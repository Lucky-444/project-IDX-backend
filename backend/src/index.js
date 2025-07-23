import express from "express";
import cors from "cors";
import { PORT } from "./config/serverConfig.js";
import apiRouter from './routes/index.js'
import { Server } from 'socket.io';
import { createServer } from 'node:http';
const app = express();

const server = createServer(app);
const io = new Server(server , {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

io.on('connection' , (socket) => {
  console.log("A User Is connected" , socket.id);
})


app.use('/api',apiRouter);
app.get("/ping", (req, res) => {
  res.json({message : "pong"});
});

server.listen(PORT, () => {
  console.log(`server is runnig on PORT ${PORT}`);
});


