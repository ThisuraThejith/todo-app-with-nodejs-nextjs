const { authJwt } = require("../middleware");
const controller = require("../controllers/todo.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/todo/get",
    [authJwt.verifyToken],
    controller.getToDoItemList
  );
  app.post(
    "/api/todo/add",
    [authJwt.verifyToken],
    controller.addToDoItem
  );
  app.put(
    "/api/todo/update/:id",
    [authJwt.verifyToken],
    controller.updateToDoItem
  );
  app.delete(
    "/api/todo/delete/:id",
    [authJwt.verifyToken],
    controller.deleteToDoItem
  );
};