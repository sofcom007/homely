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
const projectModel = require('../models/project.model')


router.get('/read-project/:slug', async (req, res) => {
    try{
        const { slug } = req.params
        
        const project = await projectModel.findOne({ slug: slug })
        
        if(!project){
            console.log("no project with slug " + slug)
            return res.status(400).json({ message: "Project not found"})
        }
        
        res.status(200).json(project)
    } catch (error) {
        console.error("Project fetching by slug failed:", error);
        res.status(500).json({ error: "Failed to fetch project by slug" });
    }
})
router.get('/read-home-projects', async (req, res) => {
    try{
        const projects = await projectModel.find({})
        projects.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        const prjs = projects.slice(0, 3)

        res.status(200).json(prjs)
    } catch (error) {
        console.error("Featured projects fetching failed:", error);
        res.status(500).json({ error: "Failed to fetch featured projects" });
    }
})
router.get('/read-projects', async (req, res) => {
    try {
        const projects = await projectModel.find({});
        projects.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        res.status(200).json(projects);
    } catch (error) {
        console.error("Project fetching failed:", error);
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});
router.post('/create-project', uploadPictures.fields([{ name: 'cover', maxCount: 1 }, { name: 'pictures', maxCount: 10 }]), async (req, res) => {
    try{
        //get and check the body
        const { name, status, description } = req.body
        if(!name)
            return res.status(400).json({ message: "Name is necessary" })
        if(!status)
            return res.status(400).json({ message: "Status is necessary" })
        if(!description)
            return res.status(400).json({ message: "Description is necessary" })

        //get the pictures
        const coverFile = req.files['cover']?.[0]
        const picturesFiles = req.files['pictures'] || []
        //get the picture names
        const cover = coverFile?.filename || null
        const pictures = picturesFiles.map(file => file.filename)

        const newProject = new projectModel({
            name,
            status,
            description,
            cover,
            pictures
        })

        await newProject.save()

        res.status(200).json({ message: 'Project created successfully' })
    } catch (error ){
        console.error("Project fetching failed:", error);
        res.status(500).json({ error: "Failed to create project " + error });
    }
})
router.put('/update-project/:id', uploadPictures.fields([{ name: 'cover', maxCount: 1 }, { name: 'pictures', maxCount: 10 }]), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status, description } = req.body;

        // Ensure necessary fields are provided
        if (!name || !status || !description) {
            return res.status(400).json({ message: "Name, status and description fields are necessary" });
        }

        // Find the existing project
        const project = await projectModel.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Handle cover update (if a new cover is uploaded)
        let newCover = project.cover;
        if (req.files['cover']) {
            newCover = req.files['cover'][0].filename;

            // Remove old cover file
            const coverPath = path.join(__dirname, "../uploads", path.basename(project.cover));
            if (fs.existsSync(coverPath)) {
                fs.unlinkSync(coverPath);  
            }
        }

        // Handle pictures update (if new pictures are uploaded)
        let pictures = project.pictures || [];
        if (req.files['pictures']) {
            const newPictures = req.files['pictures'].map(file => file.filename);
            pictures = pictures.concat(newPictures);
        }

        // Update project fields
        project.name = name;
        project.status = status;
        project.description = description;
        project.cover = newCover;
        project.pictures = pictures;

        // Save the updated project
        await project.save();

        // Return a success message
        res.status(200).json({ message: 'Project updated successfully' });

    } catch (error) {
        console.error("Project update failed:", error);
        res.status(500).json({ error: "Failed to update project" });
    }
})
router.delete('/delete-project-picture/:id/:picture', async (req, res) => {
    try{
        const { id, picture } = req.params

        //find project
        const portfolio = await projectModel.find({})
        const project = portfolio.find(project => project.id === id)

        //delete picture
        const picturePath = path.join(__dirname, "../uploads", path.basename(picture));
        if(fs.existsSync(picturePath))
            fs.unlinkSync(picturePath)  

        //remove the picture from the record
        const newPictures = project.pictures.filter(pic => pic != picture)
        await projectModel.findByIdAndUpdate(id, {
            pictures: newPictures
        })

        res.status(200).json({ message: "Image deleted successfully" })
    } catch (error){
        console.error("Project picture deletion failed:", error)
        res.status(500).json({ error: "Failed to delete project picture" })
    }
})
router.delete('/delete-project/:id', async (req, res) => {
    try{
        const id = req.params.id

        //find project
        const portfolio = await projectModel.find({})
        const project = portfolio.find(project => project.id === id)

        if(!project)
            return res.status(400).json({ message: "Project not found" })

        //delete cover
        const coverPath = path.join(__dirname, "../uploads", path.basename(project.cover));
        if(fs.existsSync(coverPath))
            fs.unlinkSync(coverPath)   
        //delete pictures   
        project.pictures.forEach(picture => {
            const picturePath = path.join(__dirname, "../uploads", path.basename(picture));
            if(fs.existsSync(picturePath))
                fs.unlinkSync(picturePath)  
        });

        await projectModel.findByIdAndDelete(id)

        res.status(200).json({ message: "Project deleted successfully" })
    } catch (error){
        console.error("Project deletion failed:", error)
        res.status(500).json({ error: "Failed to delete entire project" })
    }
})
router.delete('/delete-portfolio', async (req, res) => {
    try{
        const portfolio = await projectModel.find({})

        //delete images
        portfolio.forEach(project => {
            //delete cover
            const coverPath = path.join(__dirname, "../uploads", path.basename(project.cover));
            if(fs.existsSync(coverPath))
                fs.unlinkSync(coverPath)

            //delete pictures
            project.pictures.forEach(picture => {
                const picturePath = path.join(__dirname, "../uploads", path.basename(picture));
                if(fs.existsSync(picturePath))
                    fs.unlinkSync(picturePath)                
            });
        });

        await projectModel.deleteMany({})

        res.status(200).json({ message: "Entire portfolio deleted successfully" })
    } catch (error){
        console.error("Portfolio deletion failed:", error)
        res.status(500).json({ error: "Failed to delete entire portfolio" })
    }
})


module.exports = router