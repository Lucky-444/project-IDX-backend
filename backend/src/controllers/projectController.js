import util from "util";
import child_process from "child_process";
import fs from "fs/promises";
import uuid4 from "uuid4";

const execPromisified = util.promisify(child_process.exec);

export const createProjectController = async (req, res) => {
  //   const { stdout, stderr } = await execPromisified('dir');
  //   console.log("stdout:", stdout);
  //   console.error("stderr:", stderr);

  //   return res.json({
  //     message: "Project created Successfully",
  //   });

  // we dont want to run this code like npx create vite@latest
  //it hampers our main backend code
  //and creates here
  //and make a lot of problems for us

  //so what can i do
  //i can run this in our projects folder
  //lets make a projects folder out side of src folder
  //and run this command in that folder

  //we need fs file system module to create a unique-ID file  name inside the projects folder
  //so we can run this command in that folder and create a new project in that folder

  //create a unique id and then inside the projects folder and create a new folder with that id
  //and then run the command in that folder

  const newProjectId = uuid4();
  console.log("New Project Id is ->", newProjectId);

  await fs.mkdir(`./projects/${newProjectId}`); // create a new folder with the unique id


  //after this call the npm create vite commmand in newly created project Folder
  const response = await execPromisified(`npm create vite@latest sandbox -- --template react` ,{
        cwd: `./projects/${newProjectId}`, // run the command in the newly created projectID folder
  });

  return res.json({
    message: "project Created Successfully",
    data : newProjectId
  });
};
