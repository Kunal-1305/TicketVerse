const User = require("../models/User")

const getUsers = async (
  req,
  res
) => {
  try {
    const users =
      await User.find({
        role: "user"
      }).select("-password")

    res.json(users)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const blockUser = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.params.id
      )

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    if (
      user.role === "admin"
    ) {
      return res.status(400).json({
        message:
          "Admin cannot be blocked"
      })
    }

    user.isBlocked = true

    await user.save()

    res.json({
      message: "User Blocked"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const unblockUser =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.params.id
        )

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        })
      }

      user.isBlocked = false

      await user.save()

      res.json({
        message:
          "User Unblocked"
      })
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      })
    }
  }

const deleteUser = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.params.id
      )

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    if (
      user.role === "admin"
    ) {
      return res.status(400).json({
        message:
          "Admin cannot be deleted"
      })
    }

    await User.findByIdAndDelete(
      req.params.id
    )

    res.json({
      message:
        "User Deleted"
    })
  } catch (error) {
    res.status(500).json({
      message:
        error.message
      })
    }
}

module.exports = {
  getUsers,
  blockUser,
  unblockUser,
  deleteUser
}