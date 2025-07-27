import express from "express";
import cors from "cors";
import { PORT } from "./config/serverConfig.js";
import apiRouter from "./routes/index.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import chokidar from "chokidar";
import path from "node:path";
import { handleEditorSocketEvents } from "./socketHandlers/editorHandler.js";
const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

io.on("connection", (socket) => {
  console.log("A User Is connected", socket.id);
});

app.use("/api", apiRouter);
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

//segregate the events through namespaces in socket.io
const editorNamespace = io.of("/editor");

editorNamespace.on("connection", (socket) => {
  console.log("Connected EDITOR");
  //somehow we will get the projectID from frontend
  let projectId = socket.handshake.query["projectId"];

  console.log("Project id received after connection", projectId);
  //we will emit the projectID to the frontend
  if (projectId) {
    var watcher = chokidar.watch(`./projects/${projectId}`, {
      ignored: (path) => path.includes("node_modules"),
      persistent: true /**keeps the watcher in running state till the time your app is running */,
      awaitWriteFinish: {
        stabilityThreshold: 2000, //ensure stability of files before triggering any event
        ignoredInitial: true, //ignore the initial files inside the directory
      },
    });

    watcher.on("all", (event, path) => {
      console.log(event, path);
    });
  }

  handleEditorSocketEvents(socket, editorNamespace);

  // socket.on("disconnect", async () => {
  //     await watcher.close();
  //     console.log("editor disconnected");

  // });
});

server.listen(PORT, () => {
  console.log(`server is runnig on PORT ${PORT}`);
});
