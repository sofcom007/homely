import mongoose from "mongoose";

const awardSchema = new mongoose.model(
    {
        title: {
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