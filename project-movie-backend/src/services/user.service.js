const knex = require("../database/knex");
const bcrypt = require("bcrypt");

function makeUserService() {
  function readUser(payload) {
    const user = {
      username: payload.username,
      email: payload.email,
      password: payload.password,
    };
    // Remove undefined fields
    Object.keys(user).forEach(
      (key) => user[key] === undefined && delete user[key]
    );
    return user;
  }

  async function createUser(payload) {
    const user = readUser(payload);

    const hash = bcrypt.hashSync(user.password, 12);

    await knex("account").insert({
      username: user.username,
      email: user.email,
      password_hash: hash,
    });

    return { username: user.username, email: user.email };
  }

  async function getUser(username) {
    return knex("account")
      .where("username", username)
      .select("username", "email")
      .first();
  }

  async function updatePassword(username, payload) {
    const result = await knex("account")
      .where("username", username)
      .select("password_hash")
      .first();

    if (!result) {
      return new Error(`User ${username} not found`);
    }

    const isSamePass = await bcrypt.compare(
      payload.curPass,
      result.password_hash
    );

    if (!isSamePass) {
      return new Error("Current password is incorrect");
    } else {
      const hash = await bcrypt.hash(payload.newPass, 12);

      await knex("account")
        .where("username", username)
        .update({ password_hash: hash });

      return { username };
    }
  }

  async function deleteUser(username) {
    return knex("account").where("username", username).del();
  }

  return {
    createUser,
    getUser,
    updatePassword,
    deleteUser,
  };
}

module.exports = makeUserService;
