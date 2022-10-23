const router = require('express').Router()
let { userSignupValidator, userSigninValidator } = require('../validators/user')
let { signup, signin, user } = require('../controllers/user')
const checkUserAuth = require('../middlewares/check-user-auth')

router.get("/:id", checkUserAuth, user)              //  http://localhost:8080/api/user/:id                             
router.post("/signup", userSignupValidator, signup)  //  http://localhost:8080/api/user/signup
router.post("/signin", userSigninValidator, signin)  //  http://localhost:8080/api/user/signin

module.exports = router


