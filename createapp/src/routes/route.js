const express = require("express")
const router = express.Router()
// import { login, createUser } from "../controllers/user";
const userController = require('../controllers/user')



router.get("/test", (req, res) => {
    return res.status(200).send("Everything is fine")
})

router.post("/register", userController.createUser)
router.post("/login", userController.login)
router.get("/followers/:userId", userController.followerList)
router.get("/following/:userId", userController.followingList)

router.all("/*", (req, res)=>{
    return res.status(400).send({status:false, msg:"invalid http request"})
})

module.exports = router