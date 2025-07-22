import { createProjectService, getProjectTreeService } from "../service/projectService.js";

export const createProjectController = async (req, res) => {
  const newProjectId = await createProjectService();

  return res.json({
    message: "project Created Successfully",
    data: newProjectId,
  });
};

export const getProjectTreeController = async (req, res) => {
  const projectTree = await getProjectTreeService(req.params.projectId);
  return res.json({
    message: "Project Tree Retrieved Successfully",
    data: projectTree,
    success : true
  });
};
