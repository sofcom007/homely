const mongoose = require('mongoose')

const visitSchema = new mongoose.Schema(
    {
        visitId: {
            type: String,
            required: true
        },
        pages: {
            type: [String],
            required: true,
            default: []
        },
        articles: {
            type: [String],
            required: true,
            default: []
        },
        projects: {
            type: [String],
            required: true,
            default: []
        }
    },
    {
        timestamps: true
    }
)

const Visit = mongoose.model("Visit", visitSchema)
module.exports = Visit