import React from 'react'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
//import css
import '../css/portfolio.css'
//nav imports
import PublicNav from '../components/publicNav'
import PublicFooter from '../components/publicFooter'
//component imports
import Project from '../components/project'
import CTASection from '../components/ctaSec'

const portfolio = () => {
  //CRUD read projects
  const [projects, setProjects] = useState()
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
  }, [projects])
  const fetchProjects = async () => {
      try{
        const response = await axios.get('http://localhost:8080/projects/read-projects')
        const data = response.data
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
        <section className="double_topped double_bottomed lefted righted">
          <h1 className='animated fade_in'>Portfolio</h1>

          <ul className="filters animated fade_in">
            <li><button ref={filterAllRef} onClick={() => { filterProjects('') }} className="filter"><p>All</p></button></li>
            <li><button ref={filterCompleteRef} onClick={() => { filterProjects('complete') }} className="filter"><p>Complete</p></button></li>
            <li><button ref={filterOngoingRef} onClick={() => { filterProjects('ongoing') }} className="filter"><p>Ongoing</p></button></li>
          </ul>

          <div id="project_holder">
            {projects && projects.map((project, i) => {
              return (
                <Project 
                  image={`http://localhost:8080/uploads/${project.cover}`}
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