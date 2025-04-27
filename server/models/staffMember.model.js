const mongoose = require('mongoose')

const staffMemberSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        picture: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const StaffMember = mongoose.model("Staff_member", staffMemberSchema)
module.exports = StaffMember