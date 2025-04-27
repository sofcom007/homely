import React from 'react'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
//nav imports
import PublicNav from '../components/publicNav'
import PublicFooter from '../components/publicFooter'
//component imports
import Article from '../components/article'
import CTASection from '../components/ctaSec'

const articles = () => {
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
  }, [articles])
  const fetchArticles = async () => {
    try{
      const response = await axios.get('http://localhost:8080/read-articles')
      const data = response.data
      //console.log(data)
      return data
    } catch (error) {
        alert("Error: Couldn't fetch Articles")
        console.error("Article fetching failed: ", error)
      }
  }

  //filter articles
  const filterNewerRef = useRef()
  const filterOlderRef = useRef()
  async function filterArticles(order) {
    const ats = await fetchArticles()
    console.log(ats)
    let newAts
    if( order == 'newer' )
      newAts = ats.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    else if( order == 'older' )
      newAts = ats.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
    setArticles(newAts)
  }

  //scroll animation
  useEffect(() => {
    document.title = "Homely Articles"

    //filterArticles
    const filterBtns = [filterNewerRef.current, filterOlderRef.current]
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

    //get articles
    const getArticles = async () => {
      const ats = await fetchArticles()
      setArticles(ats)
    }
    getArticles()

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
        <div className="double_topped double_bottomed lefted righted">
          <h1 className='animated fade_in'>Articles</h1>

          <ul className="filters animated fade_in">
            <li><button ref={filterNewerRef} onClick={() => { filterArticles('newer') }} className="filter"><p>Newer</p></button></li>
            <li><button ref={filterOlderRef} onClick={() => { filterArticles('older') }} className="filter"><p>Older</p></button></li>
          </ul>

          <div id="articles">
            {articles && articles.map((article, i) => {
              return (
                <Article 
                  link={article.slug}
                  image={`http://localhost:8080/uploads/${article.thumbnail}`}
                  title={article.title}
                  date={new Date(article.updatedAt).toISOString().split("T")[0]}
                  key={i}
                />
              )
            })}
          </div>
        </div>

        <CTASection />
      </main>

      < PublicFooter />
    </>
  )
}

export default articles