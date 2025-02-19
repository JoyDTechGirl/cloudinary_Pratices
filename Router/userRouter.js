const { register,getAll, getOne, updateUser, deleteUser } = require("../Controllers/userController");
const upload = require("../utils/multer");

const express = require("express");
const router = express.Router();

router.post("/registers", upload.single("profilePicture"), register);

router.get('/users',getAll)

router.get("/users/:id", upload.single("profilePicture"), getOne)

router.patch("/users/:id", upload.single("profilePicture"), updateUser)

router.delete("/users/:id", upload.single("profilePicture"), deleteUser)

module.exports = router;
