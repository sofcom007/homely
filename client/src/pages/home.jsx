import React from 'react'
import { Link } from 'react-router'
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
//nav imports
import PublicNav from '../components/publicNav'
import PublicFooter from '../components/publicFooter'
import CTASection from '../components/ctaSec'
//component imports
import Project from '../components/project'
import Article from '../components/article'
//css imports
import '../css/home.css'

const home = () => {
  return (
    <>
      <PublicNav />
      
      <main>
        <section id="hero" className='double_topped double_bottomed lefted righted'>
          <img src="" alt="" />
          <div id="hero_txt">
            <h1>Tagline of Homely Architecture Agency</h1>
            <Link className='cta' to='/about'><p>Learn more</p></Link>
          </div>
        </section>

        <section id="statistics" className="double_bottomed lefted righted">
          <div className="stat_cell">
            <h1><strong>XX</strong></h1>
            <h3>Years of Experience</h3>
          </div>
          <div className="stat_cell">
            <h1><strong>XX</strong></h1>
            <h3>Projects Completed</h3>
          </div>
          <div className="stat_cell">
            <h1><strong>XX</strong></h1>
            <h3>Awards Won</h3>
          </div>
          <div className="stat_cell">
            <h1><strong>XX%</strong></h1>
            <h3>Customer Satisfaction</h3>
          </div>
        </section>

        <section id="project_sec" className="double_bottomed lefted">
          <h2>Featured Projects</h2>
          <div id="project_holder">
            <div id="projects">
              <Project 
                image=""
                name="Project name 1"
                link=""
              />
              <Project 
                image=""
                name="Project name 2"
                link=""
              />
              <Project 
                image=""
                name="Project name 3"
                link=""
              />
              <Project 
                image=""
                name="Project name 4"
                link=""
              />
            </div>
          </div>
          <div id="project_nav">
            <button className="project_nav"><FontAwesomeIcon icon={faChevronLeft} /></button>
            <button className="project_nav"><FontAwesomeIcon icon={faChevronRight} /></button>
            <Link className='cta' to='/portfolio'><p>See more</p></Link>
          </div>
        </section>

        <section id="article_sec" className="double_bottomed lefted righted">
          <h2>Featured Articles</h2>
          <div id="articles">
              <Article 
                image=""
                title="Title of an article 1"
                date="00.00.0000"
              />
              <Article 
                image=""
                title="Title of an article 2"
                date="00.00.0000"
              />
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
