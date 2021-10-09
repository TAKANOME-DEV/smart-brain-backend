const db = require("../db");

// @desc method: DELETE / Delete User
// @route /delete/:id
// @access Public

exports.handleDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await db.transaction((trx) => {
      trx("users")
        .where({ id })
        .returning("*")
        .del()
        .then((user) => {
          trx("login")
            .where({ id })
            .returning("*")
            .del()
            .then((user) => res.json(user))
            .then(trx.commit)
            .then(trx.rollback);
        });
    });
  } catch (err) {
    res.status(400).json("Something Went Wrong");
    console.error(err);
  }
};
