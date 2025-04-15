import React from 'react'
import { useEffect } from 'react'
//nav imports
import PublicNav from '../components/publicNav'
import PublicFooter from '../components/publicFooter'
//component imports
import Article from '../components/article'
import CTASection from '../components/ctaSec'

const articles = () => {
  //scroll animation
  useEffect(() => {
    document.title = "Homely Articles"

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
        <div className="double_topped double_bottomed lefted righted">
          <h1>Articles</h1>

          <ul className="filters">
            <li><button className="filter"><p>All</p></button></li>
            <li><button className="filter"><p>Newer</p></button></li>
            <li><button className="filter"><p>Older</p></button></li>
          </ul>

          <div id="articles">
            <Article 
              image=""
              title="Title of an article 1"
              date="00.00.0000"
            />
            <Article 
              image=""
              title="Title of an article 1"
              date="00.00.0000"
            />
            <Article 
              image=""
              title="Title of an article 1"
              date="00.00.0000"
            />
            <Article 
              image=""
              title="Title of an article 1"
              date="00.00.0000"
            />
          </div>
        </div>

        <CTASection />
      </main>

      < PublicFooter />
    </>
  )
}

export default articles