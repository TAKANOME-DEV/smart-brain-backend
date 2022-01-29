const express = require("express");
const router = express.Router();
const {
  handleGetUser,
  handleDeleteUser,
  handleGetUsers,
  handleCreateUser,
} = require("../controllers/users");
const { requireAdmin, requireAuth } = require("../middleware/auth");

router.get("/", requireAuth, handleGetUsers);
router.get("/:id", requireAuth, handleGetUser);
router.post("/", handleCreateUser);
router.delete("/:id", requireAdmin, handleDeleteUser);

module.exports = router;
