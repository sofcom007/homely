import mongoose from "mongoose";

const articleSchema = new mongoose.model(
    {
        title: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        contentSanitized: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Article = mongoose.model("Award", articleSchema)
module.exports = Article