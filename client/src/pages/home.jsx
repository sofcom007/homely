import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
//api url
import { useApiUrl } from '../context/apiContext'
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
//nav imports
import PublicNav from '../components/publicNav'
import PublicFooter from '../components/publicFooter'
import CTASection from '../components/ctaSec'
//component imports
import ScrollToTop from '../components/scrollToTop'
import Project from '../components/project'
import Article from '../components/article'
//css imports
import '../css/home.css'
import '../css/scrollAnim.css'
//media imports
import hero from '../assets/images/home/hero.webp'

const home = () => {
  //url
  const backendUrl = useApiUrl()

  //read projects
  const [projects, setProjects] = useState()
  const fetchProjects = async () => {
      try{
        const response = await axios.get(`${backendUrl}/projects/read-home-projects`)
        const data = response.data
        //console.log("projects:", data)
        return(data)
      } catch (error) {
        alert("Error: Couldn't fetch projects")
        console.error("Project fetching failed: ", error)
      }
  }

  //project slider
  const [prjSliderId, setPrjSliderId] = useState(0)
  useEffect(() => {
    const projectHolder = document.getElementById("projects")
    const renderedProjects = document.querySelectorAll(".project")
    if (!projectHolder || renderedProjects.length === 0) return
  
    // clamp the value
    if (prjSliderId < 0) {
      if (prjSliderId !== 0) setPrjSliderId(0)
      return
    } else if (prjSliderId > renderedProjects.length - 1) {
      const maxIndex = renderedProjects.length - 1
      if (prjSliderId !== maxIndex) setPrjSliderId(maxIndex)
      return
    }
  
    // move the margin
    if (prjSliderId > 0) {
      let margin = 0
      for (let i = 0; i < prjSliderId; i++) {
        const project = renderedProjects[i]
        margin += project.clientWidth + 25
      }
      projectHolder.style.marginLeft = -margin + "px"
    } else {
      projectHolder.style.marginLeft = "0px"
    }
  }, [prjSliderId])  
  //project slider nav
  function nextProject(){
    setPrjSliderId(prjSliderId + 1)
  }
  function previousProject(){
    setPrjSliderId(prjSliderId - 1)
  }

  //read articles articles
  const [articles, setArticles] = useState()
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target.classList.contains('animated')) {
          if (entry.isIntersecting)
            entry.target.classList.add('show')
          else
            entry.target.classList.remove('show')
        }
      });
    },
    { threshold: 0.1 })
    const animatedElements = document.querySelectorAll('.animated')
    animatedElements.forEach((el) => observer.observe(el))
  }, [projects, articles])
  const fetchArticles = async () => {
    try{
      const response = await axios.get(`${backendUrl}/articles/read-home-articles`)
      const data = response.data
      //console.log(data)
      return data
    } catch (error) {
        alert("Error: Couldn't fetch Articles")
        console.error("Article fetching failed: ", error)
      }
  }

  useEffect(() => {
    document.title = "Homely"
    
    //get projects
    const getProjects = async () => {
      const prjs = await fetchProjects()
      setProjects(prjs)
    }
    getProjects()

    //get articles
    const getArticles = async () => {
      const ats = await fetchArticles()
      setArticles(ats)
    }
    getArticles()

    //statistics section
    const stats = [9, 10, 6]
    const statCells = document.querySelectorAll(".stat_cell")
    const statDuration = 1000 //in milliseconds
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const cell = entry.target
          const index = Array.from(statCells).indexOf(cell)
          const cellNumber = cell.querySelector("h1")
          const target = stats[index]
          const time = statDuration / target
          
          let number = 0
          const interval = setInterval(() => {
            number++
            if(number >= 10)
              cellNumber.innerHTML = number
            else
              cellNumber.innerHTML = "0" + number

            
            if(number >= target)
              clearInterval(interval)
          }, time)
        }       
      })
    })
    statCells.forEach((cell) => statObserver.observe(cell))
    
    //scroll animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target.classList.contains('animated')) {
          if (entry.isIntersecting)
            entry.target.classList.add('show')
          else
            entry.target.classList.remove('show')
        }
      });
    },
    { threshold: 0.1 })
    const animatedElements = document.querySelectorAll('.animated')
    animatedElements.forEach((el) => observer.observe(el))
  }, [])

  return (
    <>
      <PublicNav />
      
      <main>
        <section id="hero" className='double_topped bottomed lefted righted'>
          <img src={hero} className='animated fade_in' alt="Modern house designed by 'y0 Design Architect'" />
        </section>

        <section id="about" className="double_bottomed lefted righted">
          <div id="abt_content" className='animated fade_in'>
            <h1>Tagline of Homely Architecture Agency</h1>
            <p id='about_prg'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam dolores et unde nostrum voluptatibus necessitatibus officiis magnam assumenda quasi perferendis doloremque quae molestias exercitationem, iste repellat optio. Voluptates, magni minima?
            </p>
            <Link className='cta' to='/about'><p>Learn more</p></Link> 
          </div>         
        </section>

        <section id="statistics" className="animated double_bottomed lefted righted">
          <div className="stat_cell fade_in">
            <h1 style={{ fontWeight: 'bold' }}>0</h1>
            <h3>Years of Experience</h3>
          </div>
          <div className="stat_cell fade_in">
            <h1 style={{ fontWeight: 'bold' }}>0</h1>
            <h3>Projects Completed</h3>
          </div>
          <div className="stat_cell fade_in">
            <h1 style={{ fontWeight: 'bold' }}>0</h1>
            <h3>Awards Won</h3>
          </div>
        </section>

        <section id="project_sec" className="double_bottomed lefted">
          <h2>Featured Projects</h2>
          <div id="projects" style={{ transition: 'margin 0.5s' }}>
            {projects && projects.map((project, i) => {
              return (
                <Project 
                  image={project.cover}
                  name={project.name}
                  link={project.slug}
                  key={i}
                />
              )
            })}
          </div>
          <div id="project_nav">
            <button className="project_nav" onClick={() => {previousProject()}}><FontAwesomeIcon icon={faChevronLeft} /></button>
            <button className="project_nav" onClick={() => {nextProject()}}><FontAwesomeIcon icon={faChevronRight} /></button>
            <Link className='cta' to='/portfolio'><p>See more</p></Link>
          </div>
        </section>

        <section id="article_sec" className="double_bottomed lefted righted">
          <h2>Featured Articles</h2>
          <div id="articles">
            {articles && articles.map((article, i) => {
              return (
                <Article 
                  link={article.slug}
                  image={article.thumbnail}
                  title={article.title}
                  date={new Date(article.updatedAt).toISOString().split("T")[0]}
                  key={i}
                />
              )
            })}
          </div>
          <Link className='cta' to='/articles'><p>See more</p></Link>
        </section>

        <CTASection />
      </main>
      
      <PublicFooter/>
    </>
  )
}

export default home