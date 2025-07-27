import fs from "fs/promises";
export const handleEditorSocketEvents = (socket) => {
  socket.on("writeFile", async ({ data, pathToFileOrFolder }) => {
    try {
      const response = await fs.writeFile(pathToFileOrFolder, data);
      socket.emit("writeFileSuccess", {
        data: "File Written Successfully",
      });
    } catch (error) {
      console.error(error);
      console.log("Error in Writing the FIle", error);

      socket.emit("error", {
        data: "Error Writing File",
      });
    }
  });

  socket.on("createFile", async ({ pathToFileOrFolder }) => {
    const isFileAlreadyPresent = await fs.stat(pathToFileOrFolder);
    if (isFileAlreadyPresent) {
      socket.emit("error", {
        data: "File Already Present",
      });
    }

    try {
      const response = await fs.writeFile(pathToFileOrFolder, "");
      socket.emit("createFileSuccess", {
        data: "File Created Successfully",
      });
    } catch (error) {
      console.log("Error in  Creating FILE", error);
      socket.emit("error", {
        data: "Error Creating File",
      });
    }
  });

  socket.on("readFile", async ({ pathToFileOrFolder }) => {
    try {
      // const response = await fs.readFile(pathToFileOrFolder, "utf8");
      const response = await fs.readFile(pathToFileOrFolder);
      console.log(response.toString());
      socket.emit("readFileSuccess", {
        value: response.toString(),
        path: pathToFileOrFolder,
      });
    } catch (error) {
      console.log("Error in Reading the FIle", error);
      socket.emit("error", {
        data: "Error Reading File",
      });
    }
  });

  socket.on("deleteFile", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fa.unlink(pathToFileOrFolder);
      socket.emit("deleteFileSuccess", {
        data: "File Deleted Successfully",
      });
    } catch (error) {
      console.log("delete File error", error);
      socket.emit("error", {
        data: "Error Deleting File",
      });
    }
  });

  socket.on("createFolder", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.mkdir(pathToFileOrFolder);
      socket.emit("createFolderSuccess", {
        data: "Folder created successfully",
      });
    } catch (error) {
      console.log("Error creating the folder", error);
      socket.emit("error", {
        data: "Error creating the folder",
      });
    }
  });

  socket.on("deleteFolder", async ({ pathToFileOrFolder }) => {
    try {
        //recursive : true -> all folder inside this folder will be deleted
      const response = await fs.rmdir(pathToFileOrFolder, { recursive: true });
      socket.emit("deleteFolderSuccess", {
        data: "Folder deleted successfully",
      });
    } catch (error) {
      console.log("Error deleting the folder", error);
      socket.emit("error", {
        data: "Error deleting the folder",
      });
    }
  });
  socket.on("getPort", async ({ containerName }) => {
    const port = await getContainerPort(containerName);
    console.log("port data", port);
    socket.emit("getPortSuccess", {
      port: port,
    });
  });
};
