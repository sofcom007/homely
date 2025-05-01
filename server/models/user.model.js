const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: false
        },
        picture: {
            type: String,
            required: false
        },
        permission: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', () => {
    this.fullName = `${this.firstName} ${this.lastName}`
})

const User = mongoose.model("User", userSchema)
module.exports = User