import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useParams } from 'react-router'
//api url
import { useApiUrl } from '../context/apiContext'
//scroll animation
import { scrollAnim } from '../components/scrollAnim'
//import css
import '../css/projects_articles.css'
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
//import components
import PublicNav from '../components/publicNav'
import PublicFooter from '../components/publicFooter'

const projectPage = () => {
  //url
  const backendUrl = useApiUrl()
  
  //get the project slug
  const { slug } = useParams()
  const navigate = useNavigate()

  //get project
  const [project, setProject] = useState()
  useEffect(() => {
    if(project){
      document.title = project.name
      setPicSliderImg(0)
    }
  }, [project])
  async function fetchProjectBySlug() {
    const response = await fetch(`${backendUrl}/projects/read-project/${slug}`, {
      method: "GET"
    })
    const prj = await response.json()

    if(prj.message){
      alert(prj.message)
      return
    }
    
    setProject(prj)
  }
  
  //picture slider
  const [picSliderImg, setPicSliderImg] = useState()
  useEffect(() => {
    if(picSliderImg != null){      
      //clamp the value
      if(picSliderImg < 0){
        setPicSliderImg(0)
        return
      }
      else if(picSliderImg > project.pictures.length){
        setPicSliderImg(project.pictures.length)
        return
      }

      //move the project holder
      const picSlider = document.getElementById("prj_slider")
      const projectHolder = document.getElementById("prjs")
      projectHolder.style.transform = `translateX(${-picSlider.clientWidth * picSliderImg}px)`
    }
  }, [picSliderImg])
  //picture slider nav
  function nextPicture(){
    setPicSliderImg(prev => prev + 1)
  }
  function previousPicture(){
    setPicSliderImg(prev => prev - 1)
  }

  useEffect(() => {
    fetchProjectBySlug()
  }, [])
    
  return (
    <>
      <PublicNav />

      <main>
        <section id="project" className='double_topped bottomed wide_righted wide_lefted'>
                  <p id='return_link' onClick={() => {navigate(-1)}}><FontAwesomeIcon icon={faChevronLeft} /> Return</p>
          
          <div id="prj_slider">
              <button className='prj_nav' onClick={() => {previousPicture()}}><FontAwesomeIcon icon={faChevronLeft} /></button>
              <button className='prj_nav' onClick={() => {nextPicture()}}><FontAwesomeIcon icon={faChevronRight} /></button>
            <div id="prjs">
              {project? <img src={`${backendUrl}/uploads/${project.cover}`} className='sldrPic' alt="" /> : null}
              {project && project.pictures.map((picture, id) => {
                return (
                  <img src={`${backendUrl}/uploads/${picture}`} key={id} className='sldrPic' />
                )
              })}
            </div>
          </div>
          
          <h1>{project? project.name : "project not found"}</h1>

          <div id="content" dangerouslySetInnerHTML={project? { __html: project.descriptionHTML } : null}></div>
        </section>
      </main>

      <PublicFooter />
    </>
  )
}

export default projectPage