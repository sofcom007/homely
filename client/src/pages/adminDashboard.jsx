import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
//api url
import { useApiUrl } from '../context/apiContext'
//import components
import HorizontalGraph from '../components/horizontalGraph'

const adminDashboard = () => {
  document.title = 'Dashboard | Homely Admin'

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
  useEffect(() => { 
    if(data) {
      filterPages()
      filterProjects()
      filterArticles()
    }
  }, [data])
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

  //page data
  const [pageData, setPageData] = useState()
  const [pageVisits, setPageVisits] = useState()
  useEffect(() => {
    if(pageData) {
      let pgv = 0
      pageData.forEach(page => {
        pgv += page.value
      })
      setPageVisits(pgv)
    }
  }, [pageData])
  function filterPages() {
      const now = new Date()

      let preDate = new Date().setUTCHours(0, 0, 0, 0)
      //filter the pages
      data.pages.forEach(page => {
          let newDates = []
          page.visits.forEach(visit => {
              if(new Date(visit) > preDate)
                  newDates.push(visit)
          })
          page.visits = newDates
      })
      //set page data
      let pgs = []
      data.pages = data.pages.filter(page => page.visits.length != 0)
      data.pages.forEach(page => {
          const newPage = {
              name: page.name,
              value: page.visits.length
          }
          pgs.push(newPage)
      })
      setPageData(pgs)
  }

  //project data
  const [projectData, setProjectData] = useState()
  const [projectVisits, setProjectVisits] = useState()
  useEffect(() => { 
    if( projectData ) {
      let pv = 0
      projectData.forEach(project => {
        pv += project.value
      })
      setProjectVisits(pv)
    }  
  }, [projectData])
  function filterProjects() {
    let preDate = new Date().setUTCHours(0, 0, 0, 0)
    //filter the projects
    data.projects.forEach(project => {
        let newDates = []
        project.visits.forEach(visit => {
            if(new Date(visit) > preDate)
                newDates.push(visit)  
        })
        project.visits = newDates
    })

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

  //set article data
  const [articleData, setArticleData] = useState()
  const [articleVisits, setArticleVisits] = useState()
  useEffect(() => {
    if(articleData) {
      let av = 0
      articleData.forEach(article => {
        av += article.value
      })
      setArticleVisits(av)
    }
  }, [articleData])
  function filterArticles() {
    let preDate = new Date().setUTCHours(0, 0, 0, 0)
    //filter the articles
    data.articles.forEach(articles => {
      let newDates = []
      articles.visits.forEach(visit => {
        if(new Date(visit) > preDate)
          newDates.push(visit)  
      })
      articles.visits = newDates
    })

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
      })

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
      <section className="double_topped half_bottomed fixed_lefted righted">
        <h1>Hello, User</h1>
      </section>
      
      <section className='fixed_lefted righted bottomed'>
        <div className="stat_section">
          <h2>Statistics Today</h2>
          
          <h4>{ data? data.visitors : "" } total visits</h4>
          
          <div id="dash_statistics">
            <div className="stat_subsection">
              <h3>Pages</h3>
              <p>{ pageVisits ? pageVisits: '' } visits</p>
            </div>
            <div className="stat_subsection">
              <h3>Projects</h3>
              <p>{ projectVisits ? projectVisits: '' } visits</p>
            </div>
            <div className="stat_subsection">
              <h3>Articles</h3>
              <p>{ articleVisits ? articleVisits: '' } visits</p>
            </div>
          </div>

          <Link to='statistics' className='cta'><p>More</p></Link>
        </div>
      </section>
    </>
  )
}

export default adminDashboard