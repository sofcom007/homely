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
        fullName: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: false
        },
        picture: {
            type: String,
            required: false
        },
        description: {
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