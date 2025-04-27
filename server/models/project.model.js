const mongoose = require("mongoose")
const { JSDOM } = require("jsdom")
const createDOMPurify = require("dompurify")
const marked = require("marked")
const slugify = require("slugify");

// Setup DOMPurify with jsdom
const window = new JSDOM("").window
const DOMPurify = createDOMPurify(window)

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            unique: true
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
        },
        descriptionHTML: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

// Pre-save hook to convert and sanitize markdown
function preSaveLogic(target){
    if (target.isModified("description")) {
        const rawHTML = marked.parse(target.description)
        target.descriptionHTML = DOMPurify.sanitize(rawHTML)
    }
    target.slug = slugify(target.name, { lower: true, strict: true })
}
projectSchema.pre("save", function (next) {
    preSaveLogic(this)
    next()
})

const Project = mongoose.model("Project", projectSchema)
module.exports = Project