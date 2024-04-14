import * as dao from "./dao.js";
export default function ModuleRoutes(app) {
  const createModuleByCourseId = async (req, res) => {
    const { cid } = req.params;
    const module = await dao.createModule({ ...req.body, course: cid });
    res.json(module);
  };
  const deleteModule = async (req, res) => {
    const status = await dao.deleteModule(req.params.mid);
    res.json(status);
  };
  const findCourseModulesByCourseId = async (req, res) => {
    const { cid } = req.params;
    const modules = await dao.findModulesByCourseId(cid);
    res.json(modules);
  };
  const updateModule = async (req, res) => {
    const { mid } = req.params;
    const status = await dao.updateModule(mid, req.body);
    res.json(status);
  };
  app.post("/api/courses/:cid/modules", createModuleByCourseId);
  app.get("/api/courses/:cid/modules", findCourseModulesByCourseId);
  app.delete("/api/modules/:mid", deleteModule);
  app.put("/api/modules/:mid", updateModule);
}
