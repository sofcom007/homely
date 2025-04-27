const mongoose = require('mongoose')
const { JSDOM } = require("jsdom")
const createDOMPurify = require("dompurify")
const marked = require("marked")
const slugify = require("slugify");

// Setup DOMPurify with jsdom
const window = new JSDOM("").window
const DOMPurify = createDOMPurify(window)

const articleSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            unique: true
        },
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
        contentHTML: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

// Pre-save hook to convert and sanitize markdown
articleSchema.pre("save", function (next) {
    const rawHTML = marked.parse(this.content)
    this.contentHTML = DOMPurify.sanitize(rawHTML)
    this.slug = slugify(this.title, { lower: true, strict: true })
    
    next()
})

const Article = mongoose.model("Article", articleSchema)
module.exports = Article