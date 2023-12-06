const express = require("express");
const userController = require("../controllers/user.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");

const router = express.Router();

router
  .route("/:username")
  .get(userController.getUser)
  .put(userController.updatePassword)
  .delete(userController.deleteUser)
  .all(methodNotAllowed);

module.exports = router;
