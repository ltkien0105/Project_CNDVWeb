const express = require("express");

const authController = require("../controllers/auth.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");

const router = express.Router();

router.route("/login").post(authController.signIn).all(methodNotAllowed);

router.route("/register").post(authController.createUser).all(methodNotAllowed);

router
  .route("/forget")
  .post(authController.forgetPassword)
  .all(methodNotAllowed);

module.exports = router;
