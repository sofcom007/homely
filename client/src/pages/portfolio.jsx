import React from 'react'
//nav imports
import PublicNav from '../components/publicNav'
import PublicFooter from '../components/publicFooter'
//component imports
import Project from '../components/project'
import CTASection from '../components/ctaSec'

const portfolio = () => {
  return (
    <>
      <PublicNav />

      <main>
        <section className="double_topped double_bottomed lefted righted">
          <h1>Portfolio</h1>

          <ul className="filters">
            <li><button className="filter"><p>All</p></button></li>
            <li><button className="filter"><p>Complete</p></button></li>
            <li><button className="filter"><p>Ongoing</p></button></li>
          </ul>

          <div id="project_holder">
              <Project 
                image=""
                name="Project name 1"
                link=""
              />
              <Project 
                image=""
                name="Project name 1"
                link=""
              />
              <Project 
                image=""
                name="Project name 1"
                link=""
              />
              <Project 
                image=""
                name="Project name 1"
                link=""
              />

          </div>
        </section>

        <CTASection />
      </main>

      <PublicFooter />
    </>
  )
}

export default portfolio
