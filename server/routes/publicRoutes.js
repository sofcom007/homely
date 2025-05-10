const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
//visit vars
const analyticsPath = path.join(__dirname, '../data', 'analytics.json')
const analyticsDefault = {
    "visitors": 0,
    "pages": [],
    "projects": [],
    "articles": []
}  
let analytics
const visitModel = require('../models/visit.model.js')
let visits


//visit
async function readVisits() {
    visits = await visitModel.find({})
}
async function registerSession(req) {
    await readVisits()

    //create new record
    let visitAlreadyRegistered = false
    visits.forEach(visit => {
        if(visit.visitId === req.session.id){
            visitAlreadyRegistered = true
        }
    })

    //update preexisting record
    if(!visitAlreadyRegistered) {
        const pages = req.session.pages
        const projects = req.session.projects
        const articles = req.session.articles
        const newVisit = new visitModel({
            visitId: req.session.id,
            pages: pages? pages : [],
            projects: projects? projects : [],
            articles: articles? articles : []
        })
        await newVisit.save()
    } else {
        const seshRecord = await visitModel.findOne({ visitId: req.session.id })
        seshRecord.pages = req.session.pages
        seshRecord.projects = req.session.projects
        seshRecord.articles = req.session.articles
        await seshRecord.save()
    }
}
async function updateAnalytics() {
    analytics = JSON.parse(JSON.stringify(analyticsDefault))
    await readVisits()

    
    //update visitors    
    analytics.visitors = visits.length

    let pages = []
    let projects = []
    let articles = []
    visits.forEach(visit => {
        //update pages
        const visitPages = visit.pages
        visitPages.forEach(page => {
            //is page already in the analytics
            let alreadyThere = false
            analytics.pages.forEach(page_ => {
              if(page_.name === page)
                alreadyThere = true  
            })
            
            if (!alreadyThere) {
                //add page
                analytics.pages.push({
                    "name" : page,
                    "visits": [visit.updatedAt]
                })
            } else {
                //add page visit
                const page_ = analytics.pages.find(pg => pg.name === page)
                page_.visits.push(visit.updatedAt)
            }
        })

        //update projects
        const visitProjects = visit.projects
        visitProjects.forEach(project => {
            //is project already in the analytics
            let alreadyThere = false
            analytics.projects.forEach(project_ => {
                if(project_ === project)
                    alreadyThere = true
            })
            
            if (!alreadyThere) {
                //add page
                analytics.projects.push({
                    "slug": project,
                    "visits": [visit.updatedAt]
                })
            } else {
                //add page visit
                const project_ = analytics.project.find(prj => prj.slug === prj)   
                project_.visits.push(visit.updatedAt)         
            }
        })
        
        //update articles
        const visitArticles = visit.articles
        visitArticles.forEach(article => {
            //is article already in the analytics
            let alreadyThere = false
            analytics.articles.forEach(article_ => {
                if(article_ === article)
                    alreadyThere = true
            })
            
            if (!alreadyThere) {
                //add page
                analytics.articles.push({
                    "slug": article,
                    "visits": [visit.updatedAt]
                })
            } else {
                //add page visit
                const article_ = analytics.article.find(prj => prj.slug === prj)   
                article_.visits.push(visit.updatedAt)         
            }
        })
    })
    
    fs.writeFileSync(analyticsPath, JSON.stringify(analytics, null, 2))
}
async function sessionCheck(req) {
    req.session.visited = true

    //initialize extra fields
    if(!req.session.pages)
        req.session.pages = []
    if(!req.session.projects)
        req.session.projects = []
    if(!req.session.articles)
        req.session.articles = []
}

router.get('/check-session', async (req, res) => {
    try {
        await sessionCheck(req)
        await registerSession(req)
        res.status(200).json({session : req.session, sessionId: req.session.id})
    } catch (error) {
        console.log("Error getting session info:", error)
        res.status(200).json({ erorr: "Error: Couldn't get session info" })
    }
})
router.post('/update-session', async (req, res) => {
    try {
        const { page, project, article } = req.body

        await sessionCheck(req)
        await readVisits()
        
        //update pages
        if(page) { 
            const pageList = req.session.pages

            //check if already saved
            let pageAlrRegistered = false
            pageList.forEach(page_ => {
                if(page_ === page) pageAlrRegistered = true
            })

            //save if nevessary
            if(!pageAlrRegistered){
                req.session.pages.push(page)
            }
        } 

        //update projects
        if(project) { 
            const projectList = req.session.projects

            //check if already saved
            let projectAlrRegistered = false
            projectList.forEach(project_ => {
                if(project_ === page) projectAlrRegistered = true
            })

            //save if nevessary
            if(!projectAlrRegistered)
                req.session.projects.push(project)
        }

        //update articles
        if(article) { 
            const articleList = req.session.articles

            //check if already saved
            let articleAlrRegistered = false
            articleList.forEach(article_ => {
                if(article_ === page) articleAlrRegistered = true
            })

            //save if nevessary
            if(!articleAlrRegistered)
                req.session.articles.push(article)
        }
        
        await registerSession(req)
        await updateAnalytics()

        res.status(200).json({ message: "Session updated successfully" })

    } catch (error) {
        console.log("Error updating session info:", error)
        res.status(200).json({ erorr: "Error: Couldn't update session info" })
    }
})


module.exports = router