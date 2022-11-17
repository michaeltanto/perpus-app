const router = require("express").Router()

const { userControllers } = require("../controllers")


// const {verifyToken, checkRole} = require("../middleware/auth")


router.post("/register", userControllers.register)
router.post("/login", userControllers.login)
router.get("/keepLogin", userControllers.keepLogin);
router.get("/verification", userControllers.verification);

// router.get("/users", verifyToken, checkRole, userControllers.findAllUser)


module.exports = router