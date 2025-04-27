const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
//multer setup
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const fieldName = file.fieldname; // Get the field name
        const timestamp = Date.now(); // Current timestamp
        const ext = path.extname(file.originalname); // Get the file extension
        cb(null, `${fieldName}_${timestamp}${ext}`); // Set custom filename
    }
});
const uploadPictures = multer({ storage })
//model
const articleModel = require('../models/article.model')


router.get('/read-article/:slug', async (req, res) => {
    try{
        const { slug } = req.params

        const article = await articleModel.findOne({ slug: slug })

        if(!article)
            return res.status(400).json({ message: "Article not found" })

        res.status(200).json(article)
    } catch (error) {
        console.error("Article fetching failed:", error);
        res.status(500).json({ error: "Failed to fetch article by slug" });
    }
})
router.get('/read-recommended-articles/:id', async (req, res) => {
    try{
        const { id } = req.params

        const articles = await articleModel.find({})
        if(!articles)
            return res.status(400).json({ message: "Artticles not found" })
        articles.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

        let amount = 0
        let newArticles = []
        for (let i = 0; i < articles.length; i++) {
            const article = articles[i]
            if(amount < 2 && article._id != id){
                newArticles.push(article)
                amount++
            }
        }

        res.status(200).json(newArticles)
    } catch (error) {
        console.error("Article fetching failed:", error);
        res.status(500).json({ error: "Failed to fetch article by slug" });
    }
})
router.get('/read-home-articles', async (req, res) => {
    try{
        const articles = await articleModel.find({})
        if(!articles){
            console.log("Articles not found")
            return res.status(400)
        }
        articles.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        const homeArticles = articles.splice(0, 2)

        res.status(200).json(homeArticles)
    } catch (error) {
        console.error("Featured articles fetching failed:", error);
        res.status(500).json({ error: "Failed to fetch featured articles" });
    }
})
router.get('/read-articles', async (req, res) => {
    try{
        const articles = await articleModel.find({})
        if(!articles){
            console.log("Articles not found")
            return res.status(400)
        }
        articles.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

        res.status(200).json(articles)
    } catch (error) {
        console.error("Featured projects fetching failed:", error);
        res.status(500).json({ error: "Failed to fetch featured projects" });
    }
})
router.post('/create-article', uploadPictures.single('thumbnail'), async (req, res) => {
    try{
        console.log( req.body )
        const { title, content } = req.body

        if(!title || !content)
            return res.status(400).json({ message: "Aff fileds are necessary" })
        
        const thumbnail = req.file.filename

        const newArticle = new articleModel({
            title,
            content,
            thumbnail
        })

        await newArticle.save()

        res.status(200).json({ message: "Article created successfully" })
    } catch (error) {
        console.error("Article creation failed failed:", error);
        res.status(500).json({ error: "Failed to create article" });
    }
})
router.put('/update-article/:id', uploadPictures.single('thumbnail'), async (req, res) => {
    try{
        const { id } = req.params
        const { title, content } = req.body
        
        const article = await articleModel.findById(id)
        if(!article)
            return res.status(400).json({ messae: "Article not found" })

        //create new article stull
        const newTitle = title? title : article.title
        const newContent = content? content : article.content
        const newThumbnail = req.file? req.file.filename : article.thumbnail

        //if new image is given, delete old one
        if(req.file){
            const thumbnailPath = path.join(__dirname, '../uploads', path.basename(article.thumbnail))
            if(fs.existsSync(thumbnailPath))
                fs.unlinkSync(thumbnailPath)
        }

        //update the record
        article.title = newTitle
        article.content = newContent
        article.thumbnail = newThumbnail
        
        await article.save()

        res.status(200).json({ message: "Article updated successfully" })
    } catch (error) {
        console.error("Article update failed failed:", error);
        res.status(500).json({ error: "Failed to update article" });
    }
})
router.delete('/delete-article/:id', async (req, res) => {
    try{
        const { id } = req.params

        const article = await articleModel.findById(id)
        if(!article)
            return res.status(400).json({ message: "Article not fount" })

        //delete thumbnail
        const thumbnailPath = path.join(__dirname, '../uploads', path.basename(article.thumbnail))
        if(fs.existsSync(thumbnailPath))
            fs.unlinkSync(thumbnailPath)

        //delete record
        await articleModel.findByIdAndDelete(id)

        //responds
        res.status(200).json({ message: "Project deleted successfully" })

    } catch (error) {
        console.error("Single article deletion failed:", error);
        res.status(500).json({ error: "Failed to delete single article" });
    }
})
router.delete('/delete-articles', async (req, res) => {
    try{
        const articles = await articleModel.find({})

        if(articles.length == 0)
            return res.status(200).json({ message: "No articles found" })

        //delete all thumbnails
        articles.forEach(article => {
            const thumbnailPath = path.join(__dirname, '../uploads', path.basename(article.thumbnail))
            if(fs.existsSync(thumbnailPath))
                fs.unlinkSync(thumbnailPath)
        })

        //delete all records
        await articleModel.deleteMany({})

        //respond
        res.status(200).json({ message: "All articles deleted successfully" })

    } catch (error) {
        console.error("All articles deletion failed:", error);
        res.status(500).json({ error: "Failed to delete all articles" });
    }
})


module.exports = router