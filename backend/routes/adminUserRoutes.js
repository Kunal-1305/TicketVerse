const express = require("express")

const {
  getUsers,
  blockUser,
  unblockUser,
  deleteUser
} = require(
  "../controllers/adminUserController"
)

const router = express.Router()

router.get("/", getUsers)

router.put(
  "/block/:id",
  blockUser
)

router.put(
  "/unblock/:id",
  unblockUser
)

router.delete(
  "/:id",
  deleteUser
)

module.exports = router