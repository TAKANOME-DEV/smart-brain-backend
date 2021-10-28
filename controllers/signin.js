const db = require("../db");
const bcrypt = require("bcryptjs");

// @desc method: POST / Login User
// @route /login
// @access Public

exports.handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Incorrect Form Submission");
    }

    const response = await db("email", "hash").from("login").where({ email });
    if (response.length) {
      const isValid = bcrypt.compareSync(password, response[0].hash);
      if (isValid) {
        const user = await db("users").where({ email });
        return res.json(user[0]);
      } else {
        return res.status(400).json("Email Or Password Invalid");
      }
    } else {
      return res.status(400).json("Email Or Password Invalid");
    }
  } catch (error) {
    res.status(400).json("Something Went Wrong");
    console.log(error);
  }
};

// exports.handleUserLogin = (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json("Incorrect Form Submission");
//     }

//     db("email", "hash")
//       .from("login")
//       .where({ email })
//       .then((data) => {
//         const isValid = bcrypt.compareSync(password, data[0].hash);

//         if (isValid) {
//           return db("users")
//             .where({ email })
//             .then((user) => res.json(user[0]))
//             .catch((err) => res.status(404).json("Email Or Password Invalid"));
//         } else {
//           return res.status(404).json("Email Or Password Invalid");
//         }
//       });
//   } catch (error) {
//     res.status(404).json("Email Or Password Invalid");
//     console.error(error);
//   }
// };
