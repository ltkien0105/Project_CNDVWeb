const makeAuthService = require("../services/auth.service");
const makeUserService = require("../services/user.service");
const ApiError = require("../api-error");

const jwt = require("jsonwebtoken");

//Sign in authentication
async function signIn(req, res, next) {
  if (!req.body?.username && !req.body?.email) {
    return next(new ApiError(400, "Username or email is required"));
  }
  if (!req.body?.password) {
    return next(new ApiError(400, "Password is required"));
  }

  const response = await makeAuthService().signIn(req.body);

  if (response instanceof Error) {
    return next(new ApiError(500, response.message));
  }

  try {
    jwt.sign(response.payload, response.secret, (error, token) => {
      if (error) throw new Error(500, "Sign in error!");
      return res.send({ token, user: response.payload });
    });
  } catch (error) {
    return res.send({ message: error.message });
  }
}

// Create a user
async function createUser(req, res, next) {
  if (!req.body?.username) {
    return next(new ApiError(400, "Username can not be empty"));
  }
  if (!req.body?.email) {
    return next(new ApiError(400, "Email can not be empty"));
  }
  if (!req.body?.password) {
    return next(new ApiError(400, "Password can not be empty"));
  }

  try {
    const userService = makeUserService();
    const user = await userService.createUser(req.body);

    return res.send(user);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(
        500,
        `An error occured when creating the user: Username "${req.body?.username}" existed`
      )
    );
  }
}

async function forgetPassword(req, res, next) {
  if (!req.body?.username && !req.body?.email) {
    return next(new ApiError(400, "Username or email is required"));
  }

  if (!req.body?.newPassword) {
    return next(new ApiError(400, "New password is required"));
  }

  const response = await makeAuthService().restorePassword(req.body);

  if (response instanceof Error) {
    return next(new ApiError(500, response.message));
  }

  return res.send(response);
}

module.exports = { signIn, createUser, forgetPassword };
