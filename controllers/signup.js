const db = require("../db");
const bcrypt = require("bcryptjs");

// @desc POST register a user
// @route /register
// @access Public

exports.handleUserSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json("Incorrect Form Submission");
    }

    const hash = bcrypt.hashSync(password);

    await db.transaction(async (trx) => {
      const user = await trx("users").where({ email });
      if (user.length) {
        return res.status(400).json("Email Already Exist");
      } else {
        const insertIntoLogin = await trx("login").returning("email").insert({
          email,
          hash,
        });
        const loginEmail = insertIntoLogin;
        const insertIntoUser = await trx("users").returning("*").insert({
          username,
          email: loginEmail[0],
          joined: new Date(),
        });
        const user = insertIntoUser;
        res.json(user[0]);
        trx.commit;
        trx.rollback;
      }
    });
  } catch (err) {
    res.status(400).json("Something Went Wrong, Please Try Again");
    console.error(err);
  }
};

// exports.handleUserSignup = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json("Incorrect Form Submission");
//     }

//     const hash = bcrypt.hashSync(password);

//     await db.transaction((trx) => {
//       trx("login")
//         .returning("email")
//         .insert({
//           email,
//           hash,
//         })
//         .then((email) => {
//           trx("users")
//             .returning("*")
//             .insert({
//               username,
//               email: email[0],
//               joined: new Date(),
//             })
//             .then((user) => res.json(user[0]))
//             .then(trx.commit)
//             .catch(trx.rollback);
//         })
//         .catch((err) => {
//           res.status(400).json("Email Already Exist");
//           console.error(err);
//         });
//     });
//   } catch (err) {
//     res.status(400).json("Unable To Sign Up");
//     console.error(err);
//   }
// };
