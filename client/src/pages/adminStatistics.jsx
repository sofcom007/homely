import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
//api url
import { useApiUrl } from '../context/apiContext'
//import components
import HorizontalGraph from '../components/horizontalGraph'
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

const adminProjects = () => {
    document.title = 'Statistics | Homely Admin'

    //navigate
    const navigate = useNavigate()
    
    //url
    const backendUrl = useApiUrl()

    //token
    const token = localStorage.getItem('token')

    //check if not authenticated
    async function checkNotAuth () {
      try {
        const response = await fetch(`${backendUrl}/users/check-unauthenticated`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if(response.status === 200)
          navigate('/login')
      } catch (error) {
        console.error("Error checking if not authenticated", error)
        alert("Error: Couldn't check if not authenticated")
      }
    }

    //fetch analytics
    const [data, setData] = useState()
    async function fetchData() {
        try {
            const response = await fetch(`${backendUrl}/analytics/read-data`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`
                },
                credentials: 'include'
            })
            const result = await response.json()
            if(result.message || result.error)
                alert(result.message || result.error)
            else
                setData(result)
        } catch (error) {
            console.error("Error fetching data:", error)
            alert("Error: Couldn't fetch data")
        }
    }

    //filter pages
    const filterPageTimeRef = useRef()
    function filterPages() {
        const now = new Date()

        //filter page data
        const pgTime = filterPageTimeRef.current.value
        if(pgTime != ""){
            //get the before date
            let preDate = new Date().setUTCHours(0, 0, 0, 0)
            if(pgTime == "month") {
                preDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), 1)
            } else if (pgTime == "week") {
                preDate = new Date(now)
                preDate.setUTCDate(now.getUTCDate() - now.getUTCDate())
                preDate.setUTCHours(0, 0, 0, 0)
            }

            //filter the pages
            data.pages.forEach(page => {
                let newDates = []
                page.visits.forEach(visit => {
                    if(new Date(visit) > preDate)
                        newDates.push(visit)
                })
                page.visits = newDates
            })
        }

        //set page data
        let pgs = []
        data.pages.forEach(page => {
            const newPage = {
                name: page.name,
                value: page.visits.length
            }
            pgs.push(newPage)
        })
        setPageData(pgs)
    }
    
    //filter projects
    const filterPrjTimeRef = useRef()
    function filterProjects() {
        const now = new Date()

        //filter project data
        const prjTime = filterPrjTimeRef.current.value
        if(prjTime != "") {
            //get the before date
            let preDate = new Date().setUTCHours(0, 0, 0, 0)
            if(prjTime == "month") {
                preDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), 1)
            } else if (prjTime == "week") {
                preDate = new Date(now)
                preDate.setUTCDate(now.getUTCDate() - now.getUTCDate())
                preDate.setUTCHours(0, 0, 0, 0)
            }

            //filter the projects
            data.projects.forEach(project => {
                let newDates = []
                project.visits.forEach(visit => {
                    if(new Date(visit) > preDate)
                        newDates.push(visit)  
                })
                project.visits = newDates
            })
        }

        //set project data
        data.projects = data.projects.filter(prjs => prjs.visits.length != 0)
        const newPrjs = data.projects.sort((a,b) => b.visits.length > a.visits.length)
        let prjData = []
        newPrjs.forEach(prj => {
            //check if the project's already in the list
            let prjAlrAdded = false
            prjData.forEach(prj_ => {
                if(prj_.name === prj.slug)
                    prjAlrAdded = true
            })

            //create new project or update preexisting one
            if(!prjAlrAdded){
                const newPrj = {
                    name: prj.slug,
                    value: 1
                }
                prjData.push(newPrj)
            } else {
                const prj_ = prjData.find(project => project.name === prj.slug)
                prj_.value += 1
            }
        })
        setProjectData(prjData)
    }
    
    //filter articles
    const filterAtlTimeRef = useRef()
    function filterArticles() {
        const now = new Date()
        
        //filter article data
        const atlTime = filterAtlTimeRef.current.value
        if(atlTime != "") {
            //get the before date
            let preDate = new Date().setUTCHours(0, 0, 0, 0)
            if(atlTime == "month") {
                preDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), 1)
            } else if (atlTime == "week") {
                preDate = new Date(now)
                preDate.setUTCDate(now.getUTCDate() - now.getUTCDate())
                preDate.setUTCHours(0, 0, 0, 0)
            }

            //filter the articles
            data.articles.forEach(articles => {
                let newDates = []
                articles.visits.forEach(visit => {
                    if(new Date(visit) > preDate)
                        newDates.push(visit)  
                })
                articles.visits = newDates
            })
        }

        //set article data
        data.articles = data.articles.filter(atl => atl.visits.length != 0)
        const newAtls = data.articles.sort((a,b) => b.visits.length > a.visits.length)
        let atlsData = []
        newAtls.forEach(atl => {
            //check if the article's already in the list
            let atlAlrAdded = false
            atlsData.forEach(atl_ => {
                if(atl_.name === atl.slug)
                    atlAlrAdded = true
            });

            //create new article or update preexisting one
            if (!atlAlrAdded) {
                const newAtl = {
                    name: atl.slug,
                    value: 1
                }
                atlsData.push(newAtl)
            } else {
                const atl_ = atlsData.find(article => article.name === atl.slug)
                atl_.value += 1
            }
        })
        setArticleData(atlsData)
    }
    useEffect(() => {
        if(data) {
            filterPages()            
            filterProjects()
            filterArticles()
        }
    }, [data])

    //assemble graph data
    const [pageData, setPageData] = useState()
    const [projectData, setProjectData] = useState([])
    const [articleData, setArticleData] = useState([])

    useEffect(() => {
        //get data
        const getData = async () => {
            await fetchData()
        }
        getData()

        //check authentication
        const checkAuth = async () => {
          await checkNotAuth()
        }
        checkAuth()
    }, [])
        
    return (
        <>
            <section id="statistics" className='three_quarter_topped fixed_lefted righted half_bottomed'>
                <h2>Analytics</h2>
            </section>
            <div id="stat_sections" className="fixed_lefted righted bottomed">
                <section className="stat_section single" >
                    <h3>Pages</h3>

                    <select ref={filterPageTimeRef} name="" id="" style={{ width: 'fit-content' }} onChange={() => { fetchData() }}>
                        <option value="day">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="">All time</option>
                    </select>

                    <HorizontalGraph values={pageData || []} />

                    
                    <div className="ss_els">
                        {pageData && pageData.map((page, i) => (
                            <button key={i} className="bullet"><p>{`${page.name}: ${page.value} visits`}</p></button>
                        ))}
                    </div>
                </section>
                <section className="stat_section double" >
                    <h3>Projects</h3>

                    <select ref={filterPrjTimeRef} name="" id="" style={{ width: 'fit-content' }} onChange={() => { fetchData() }}>
                        <option value="day">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="">All time</option>
                    </select>

                    <HorizontalGraph values={projectData || []} />

                    <div className="ss_els">
                        {projectData && projectData.map((project, i) => (
                            <button key={i} className="bullet"><p>{`${project.name}: ${project.value} visits`}</p></button>
                        ))}
                    </div>
                </section>
                <section className="stat_section double" >
                    <h3>Articles</h3>

                    <select ref={filterAtlTimeRef} name="" id="" style={{ width: 'fit-content' }} onChange={() => { fetchData() }}>
                        <option value="day">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="">All time</option>
                    </select>

                    <HorizontalGraph values={articleData || []} />
                    
                    <div className="ss_els">
                        {articleData && articleData.map((article, i) => (
                            <button key={i} className="bullet"><p>{`${article.name.length > 25 ? article.name.substring(0, 23) + ".." : article.name} : ${article.value} visits`}</p></button>
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}

export default adminProjects