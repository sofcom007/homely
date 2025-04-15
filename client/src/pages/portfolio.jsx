import React from 'react'
import { useEffect } from 'react'
//nav imports
import PublicNav from '../components/publicNav'
import PublicFooter from '../components/publicFooter'
//component imports
import Project from '../components/project'
import CTASection from '../components/ctaSec'

const portfolio = () => {
  //scroll animation
  useEffect(() => {
    document.title = "Homely Portfolio"

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

    return () => {animatedElements.forEach((el) => observer.unobserve(el));}
  }, [])

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