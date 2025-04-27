const mongoose = require('mongoose')

const awardSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
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

const Award = mongoose.model("Award", awardSchema)
module.exports = Award