const express = require("express");
const {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
  searchUsers
} = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register); //POST http://localhost:3001/api/auth/register
router.post("/login", login);  //POST http://localhost:3001/api/auth/login
router.get("/users", protect, adminOnly, getUsers); //get adminonly  http://localhost:3001/api/auth/users
router.get("/users/:id", protect, getUserById);
router.put("/users/:id", protect, updateUser);
router.delete("/users/:id", protect, adminOnly, deleteUser);
router.put("/users/block/:id", protect, adminOnly, blockUser);
router.put("/users/unblock/:id", protect, adminOnly, unblockUser);
router.get("/search", protect, adminOnly, searchUsers);

module.exports = router;
