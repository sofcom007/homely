import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useParams } from 'react-router'
//import css
import '../css/projects_articles.css'
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
//import components
import PublicNav from '../components/publicNav'
import PublicFooter from '../components/publicFooter'
import Article from '../components/article'


const articlePage = () => {
  const navigate = useNavigate()
  const { slug } = useParams()
  
  //get article
  const [article, setArticle] = useState()
  useEffect(() => {
    if(article){
      document.title = article.title
      fetchRecommendedArticles()
    }
  }, [article])
  async function fetchArticleBySlug() {
    try{
      const response = await fetch(`http://localhost:8080/read-article/${slug}`, {
        method: "GET"
      })
      const atc = await response.json()
  
      if(atc.message){
        alert(atc.message)
        return
      }
        
      setArticle(atc)
    } catch (error) {
      alert("Error: Couldn't fetch article")
      console.error("Error fetching article:", error)
    }
  }

  //get recommended articles
  const [recomArticles, setRecomArticles] = useState()
  useEffect(() => {
    console.log(recomArticles)
    
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
  }, [recomArticles])
  async function fetchRecommendedArticles() {
    try{
      const response = await fetch(`http://localhost:8080/read-recommended-articles/${article._id}`, {
        method: "GET"
      })
      const atc = await response.json()
  
      if(atc.message){
        alert(atc.message)
        return
      }

      setRecomArticles(atc)
    } catch (error) {
      alert("Error: Couldn't fetch recommended articles")
      console.error("Error fetching recommended articles")
    }
  }

  useEffect(() => {
    fetchArticleBySlug()

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
        <section className='double_topped bottomed wide_righted wide_lefted'>
          <p id='return_link' onClick={() => {navigate(-1)}}><FontAwesomeIcon icon={faChevronLeft} /> Return</p>
          
          <img id='image' src={article? `http://localhost:8080/uploads/${article.thumbnail}` : null} alt="" />
          
          <h1>{article? article.title: null}</h1>

          <div id="content" dangerouslySetInnerHTML={article? { __html: article.contentHTML } : null}></div>
        </section>
        <section id="recoms" className="lefted wide_righted wide_lefted">
            <h3>Recommended Articles</h3>
            <div id="articles">
              {recomArticles && recomArticles.map((article, i) => {
                return (
                  <Article 
                    link={article.slug}
                    image={`http://localhost:8080/uploads/${article.thumbnail}`}
                    title={article.title}
                    date="00.00.0000"
                    key={i}
                  />)
              })}
            </div>
        </section>
      </main>

      <PublicFooter />
    </>
  )
}

export default articlePage