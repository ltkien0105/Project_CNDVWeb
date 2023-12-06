const knex = require("../database/knex");
const bcrypt = require("bcrypt");

function makeAuthService() {
  async function getJWTInfo(user, result) {
    return Promise.all([
      bcrypt.compare(user.password, result.password_hash),
      Promise.resolve(result),
    ]).then((values) => {
      const areSamePasswords = values[0];
      if (!areSamePasswords) return new Error("Wrong Password!");
      const user = values[1];
      let payload = {
        username: user.username,
        email: user.email,
      };
      const secret = "SECRET";

      return { user, payload, secret };
    });
  }

  async function signIn(payload) {
    const user = payload;
    if (!user.username) {
      if (!user.email) {
        return new Error("Username or email is required");
      }

      const result = await knex("account")
        .select("username", "email", "password_hash")
        .where("email", user.email)
        .first();

      if (!result) {
        return new Error(`Email "${user.email}" not found`);
      }
      const jwtInfo = getJWTInfo(user, result);
      return jwtInfo;
    }

    const result = await knex("account")
      .select("username", "email", "password_hash")
      .where("username", user.username)
      .first();

    if (!result) {
      return new Error(`Username "${user.username}" not found`);
    }

    const jwtInfo = getJWTInfo(user, result);
    return jwtInfo;
  }

  async function restorePassword(payload) {
    if (!payload.username) {
      if (!payload.email) {
        return new Error("Username or email is required");
      }
      const result = await knex("account")
        .select("username", "email", "password_hash")
        .where("email", payload.email)
        .first();

      if (!result) {
        return new Error("Email not found");
      }

      const isSamePassword = await bcrypt.compare(
        payload.newPassword,
        result.password_hash
      );

      if (isSamePassword) {
        return new Error("New password can not be the same as old password");
      } else {
        const newPassHashed = await bcrypt.hash(payload.newPassword, 12);

        await knex("account")
          .update({ password_hash: newPassHashed })
          .where("email", payload.email);
      }

      return {
        username: result.username,
        email: result.email,
      };
    }

    const result = await knex("account")
      .select("username", "email", "password_hash")
      .where("username", payload.username)
      .first();

    if (!result) {
      return new Error("Username not found");
    }

    const isSamePassword = await bcrypt.compare(
      payload.newPassword,
      result.password_hash
    );

    if (isSamePassword) {
      return new Error("New password can not be the same as old password");
    } else {
      const newPassHashed = await bcrypt.hash(payload.newPassword, 12);

      await knex("account")
        .update({ password_hash: newPassHashed })
        .where("username", payload.username);
    }

    return {
      username: result.username,
      email: result.email,
    };
  }

  return { signIn, restorePassword };
}

module.exports = makeAuthService;
