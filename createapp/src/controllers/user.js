//
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { findOneAndUpdate } = require('../models/userModel')


let createUser = async (req,res) => {
    try {
        let newUser = await userModel.create(req.body)
        return res.status(201).send(newUser)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

let login = async (req,res) => {
    try {
        const { email, password } = req.body
        const userData = await userModel.findOne({ email: email })

        if (!userData) { return res.status(404).send({ status: false, message: "User not found" }) }

        if (userData.password != password) { return res.status(400).send({ status: false, message: "Please enter correct Password !" }) }
        const token = jwt.sign({ userId: userData._id }, "shhh", { expiresIn: "24h" })
        res.status(200).send({ status: true, message: 'Success', data: token, userDetails: userData })

    } catch (error) {
        res.status(500).json(error.message)
    }
}


let followerList = async (req, res) => {
    try {
        let userID = req.params.userId
        let checkuser = await userModel.findById(userID).lean()
        if (!checkuser) return res.status(404).send({status: false, message: "User not registered"})

        let followers = checkuser.followers
        let counts = followers.length
        


        res.send({followrsCount: counts, followersList: followers })



    } catch (error) {
        res.status(500).json(error.message)
    }
}

let followingList = async (req, res) => {
    try {
        let userID = req.params.userId
        let checkuser = await userModel.findById(userID).lean()
        if (!checkuser) return res.status(404).send({status: false, message: "User not registered"})

        let followings = checkuser.following
        let counts = followings.length
        


        res.send({followingCount: counts, followingList: followings })



    } catch (error) {
        res.status(500).json(error.message)
    }

}


let follow = async (req, res) => {
    try {
        let loggedInUser = req.params.userId
        let userToBeFollowed = req.body.userId

        let checkLoggedInUser = await userModel.findById(loggedInUser).lean()
        if (!checkLoggedInUser) return res.status(404).send({status: false, message: "User not registered"})

        let checkFollowedUser = await userModel.findById(userToBeFollowed).lean()
        if (!checkFollowedUser) return res.status(404).send({status: false, message: "User not registered"})

        // let followerDetails = checkLoggedInUser
        let newData = checkFollowedUser.followers.push(checkLoggedInUser)

        // let updateddata = await userModel.findOneAndUpdate({_id: userToBeFollowed}, {$set:{}})

        






    } catch (error) {
        res.status(500).json(error.message)
    }
}


module.exports = {createUser, login, followerList, followingList}