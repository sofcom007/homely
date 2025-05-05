import React from 'react'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
//api url
import { useApiUrl } from '../context/apiContext'
//scroll animation
import { scrollAnim } from '../components/scrollAnim'
//nav imports
import PublicNav from '../components/publicNav'
import PublicFooter from '../components/publicFooter'
//component imports
import Article from '../components/article'
import CTASection from '../components/ctaSec'

const articles = () => {
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
        body: JSON.stringify({ page: 'articles' })
      })
      const result = await response.json()
      if(result.error)
        alert(result.error)

    } catch (error) {
      alert("Error: Couldn't update session info")
      console.log("Error updating session info:", error)
    }
  }

  //read articles articles
  const [articles, setArticles] = useState()
  useEffect(() => { scrollAnim() }, [articles])
  const fetchArticles = async () => {
    try{
      const response = await fetch(`${backendUrl}/articles/read-articles`, {
        method: "GET",
        credentials: 'include'
      })
      const data = response.json()
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
    //console.log(ats)
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
    
    //update session
    const upSesh = async () => {
      await updateSession()
    }
    upSesh()

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
    scrollAnim()
  }, [])

  return (
    <>
      <PublicNav />

      <main>
        <div className="double_topped double_bottomed lefted righted">
          <h1 className='animated fade_in'>Articles</h1>

          <ul className="filters animated fade_in">
            <li><button ref={filterNewerRef} onClick={() => { filterArticles('newer') }} className="bullet"><p>Newer</p></button></li>
            <li><button ref={filterOlderRef} onClick={() => { filterArticles('older') }} className="bullet"><p>Older</p></button></li>
          </ul>

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
        </div>

        <CTASection />
      </main>

      < PublicFooter />
    </>
  )
}

export default articles