const db = require("../db");
const bcrypt = require("bcryptjs");

// @desc POST register a user
// @route /register
// @access Public

exports.handleUserSignup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json("Incorrect Form Submission");
    }

    const hash = bcrypt.hashSync(password);

    await db.transaction((trx) => {
      trx("login")
        .returning("email")
        .insert({
          email,
          hash,
        })
        .then((email) => {
          trx("users")
            .returning("*")
            .insert({
              username,
              email: email[0],
              joined: new Date(),
            })
            .then((user) => res.json(user[0]))
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .catch((err) => res.status(400).json("Something Went Wrong"));
    });
  } catch (err) {
    res.status(400).json("Unable To Sign up");
    console.error(err);
  }
};
