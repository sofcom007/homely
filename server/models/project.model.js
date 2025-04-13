import mongoose from "mongoose";

const projectSchema = new mongoose.model(
    {
        name: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        cover: {
            type: String,
            required: true
        },
        pictures: {
            type: [String],
            required: true
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

const Project = mongoose.model("Award", projectSchema)
module.exports = Project