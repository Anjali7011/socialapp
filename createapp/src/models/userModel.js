const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        follower:{
            type:[]
        },
        following:{
            type:[]
        }
    }, { timestamps:true }
)

module.exports = mongoose.model("User", userSchema)