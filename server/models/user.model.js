import mongoose from "mongoose";

const staffMemberSchema = new mongoose.model(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        picture: {
            type: String,
            required: false
        },
        status: {
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

const StaffMember = mongoose.model("Staff_member", staffMemberSchema)
module.exports = StaffMember