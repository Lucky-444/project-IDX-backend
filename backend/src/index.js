import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import { PORT } from "./config/serverConfig.js";
import apiRouter from "./routes/index.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import chokidar from "chokidar";
import path from "node:path";
import { handleEditorSocketEvents } from "./socketHandlers/editorHandler.js";
import { handleContainerCreate } from "./containers/handleContainerCreate.js";
import { handleTerminalCreation } from "./containers/handleTerminalCreation.js";
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
});

server.listen(PORT, () => {
  console.log(`server is runnig on PORT ${PORT}`);
});



// const webSocketForTerminal = new WebSocketServer({
//   noServer: true /**we will handle the upgrade of event  */,
// });

// server.on("upgrade", async(req, tcpSocket, head) => {
//   /***
//    * req : incoming request http request
//    * socket : TCP connection socket
//    * head : Buffer contain the first packet of the upgrade stream
//    */
//   /**This callBack will calll when a client tries to connect to the server through websocket */

//   const isTerminal = req.url.includes("/terminal");

//   if (isTerminal) {
//     console.log("Incoming Url ", req.url);
//     const projectId = req.url.split("=")[1];
//     console.log("Project Id received after Connection", projectId);
//     //after that we create our container
//    await handleContainerCreate(
//       projectId,
//       webSocketForTerminal,
//       req,
//       tcpSocket,
//       head
//     );

//     webSocketForTerminal.handleUpgrade(req, tcpSocket, head, async (ws) => {
//       console.log("WebSocket upgrade completed");

//       // Create container
//       const container = await handleContainerCreate(projectId);

//       // Pass connection to the WebSocket server
//       webSocketForTerminal.emit("connection", ws, req, container);
//     });
//   }
// });

// //listen the websocket connection
// webSocketForTerminal.on("connection", (ws, req, container) => {
//   console.log("Websocket Connected");
//   //helps in proceessing of streamed output which are comes from the container
//   //and sent this to client
//   handleTerminalCreation(container, ws);

//   ws.on("close", async() => {
//     await container?.remove({ force: true }, (err, data) => {
//       if (err) {
//         console.log("error While Removing Container", err);
//       }
//       console.log("Container Removed sucessFully", data);
//     });
//   });
// });
