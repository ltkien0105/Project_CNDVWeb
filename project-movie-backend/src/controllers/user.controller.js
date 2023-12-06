const makeUserService = require("../services/user.service");
const ApiError = require("../api-error");

// Get a user
async function getUser(req, res, next) {
  try {
    const userService = makeUserService();
    const user = await userService.getUser(req.params.username);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    return res.send(user);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occured when retrieving the user"));
  }
}

// Update user
async function updatePassword(req, res, next) {
  if (!req.params?.username) {
    return next(new ApiError(400, "Username can not be empty"));
  } else if (!req.body?.curPass) {
    return next(new ApiError(400, "Current password can not be empty"));
  } else if (!req.body?.newPass) {
    return next(new ApiError(400, "New password can not be empty"));
  }

  try {
    const userService = makeUserService();
    const response = await userService.updatePassword(
      req.params.username,
      req.body
    );
    if (response instanceof Error) {
      return next(new ApiError(500, response.message));
    }
    return res.send(response);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error when updating user ${req.params.username}`)
    );
  }
}

//Restore password
async function restorePassword(req, res, next) {
  if (!req.body?.username) {
    if (!req.body?.email) {
      return next(new ApiError(400, "Username or email can not be empty"));
    }
  }

  if (!req.body?.password) {
    return next(new ApiError(400, "Password can not be empty"));
  }

  try {
    const userService = makeUserService();
    const user = await userService.restorePassword(req.body);
    return res.send(user);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occured when restoring password"));
  }
}

// Delete user
async function deleteUser(req, res, next) {
  try {
    const userService = makeUserService();
    const deleted = await userService.deleteUser(req.params.username);
    if (!deleted) {
      return next(new ApiError(404, "User not found"));
    }
    return res.send({
      message: `User ${req.params.username} was deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error when deleting user ${req.params.username}`)
    );
  }
}

module.exports = {
  getUser,
  updatePassword,
  deleteUser,
  restorePassword,
};
