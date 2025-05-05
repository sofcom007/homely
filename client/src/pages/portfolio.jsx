import React from 'react'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
//api url
import { useApiUrl } from '../context/apiContext'
//scroll animation
import { scrollAnim } from '../components/scrollAnim'
//import css
import '../css/portfolio.css'
//nav imports
import PublicNav from '../components/publicNav'
import PublicFooter from '../components/publicFooter'
//component imports
import Project from '../components/project'
import CTASection from '../components/ctaSec'

const portfolio = () => {
  //url
  const backendUrl = useApiUrl()

  //update session
  async function updateSession(){
    try {
      //make request
      const response = await fetch(`${backendUrl}/update-session`, {
        credentials: 'include',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ page: 'portfolio' })
      })
      const result = await response.json()
      if(result.error)
        alert(result.error)

    } catch (error) {
      alert("Error: Couldn't update session info")
      console.log("Error updating session info:", error)
    }
  }

  //read projects
  const [projects, setProjects] = useState()
  useEffect(() => { scrollAnim() }, [projects])
  const fetchProjects = async () => {
      try{
        const response = await fetch(`${backendUrl}/projects/read-projects`, {
          method: "GET",
          credentials: 'include'
        })
        const data = response.json()
        return(data)
      } catch (error) {
        alert("Error: Couldn't fetch projects")
        console.error("Project fetching failed: ", error)
      }
  }

  //filter projects
  const filterAllRef = useRef()
  const filterCompleteRef = useRef()
  const filterOngoingRef = useRef()
  async function filterProjects(status){
    let newProjects
    const prjs = await fetchProjects()
    if(status != ""){
      newProjects = prjs.filter(project => project.status === status)
      setProjects(newProjects)
    } else{
      setProjects(prjs)
    }
  }

  //scroll animation
  useEffect(() => {
    document.title = "Homely Portfolio"
    
    //update session
    const upSesh = async () => {
      await updateSession()
    }
    upSesh()
    
    //get projects
    const getProjects = async () => {
      const prjs = await fetchProjects()
      setProjects(prjs)
    }
    getProjects()

    //select filter
    const filterBtns = [filterAllRef.current, filterCompleteRef.current, filterOngoingRef.current]
    function selectfilter(btn){
      btn.classList.add("current")
      const otherBtns = filterBtns.filter(button => button !== btn)
      //console.log(otherBtns)
      otherBtns.forEach(btn_ => {
        btn_.classList.remove("current")
      })
    }
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => { selectfilter(btn) })
    })
    selectfilter( filterBtns[0] )

    //scroll anim
    scrollAnim()
  }, [])

  return (
    <>
      <PublicNav />

      <main>
        <section className="double_topped double_bottomed lefted righted">
          <h1 className='animated fade_in'>Portfolio</h1>

          <ul className="filters animated fade_in">
            <li><button ref={filterAllRef} onClick={() => { filterProjects('') }} className="bullet"><p>All</p></button></li>
            <li><button ref={filterCompleteRef} onClick={() => { filterProjects('complete') }} className="bullet"><p>Complete</p></button></li>
            <li><button ref={filterOngoingRef} onClick={() => { filterProjects('ongoing') }} className="bullet"><p>Ongoing</p></button></li>
          </ul>

          <div id="project_holder">
            {projects && projects.map((project, i) => {
              return (
                <Project 
                  image={project.cover}
                  name={project.name}
                  link={project.slug}
                  key={i}
                />
              );
            })}
          </div>
        </section>
        <CTASection />
      </main>

      <PublicFooter />
    </>
  )
}

export default portfolio