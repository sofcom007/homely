import React from 'react'
import { Link } from 'react-router'
//api url
import { useApiUrl } from '../context/apiContext'

const article = ({ image, title, date, link }) => {
  //url
  const backendUrl = useApiUrl()
  
  return (
    <Link to={`/articles/${link}`} className='article animated fade_in'>
      <img src={image? `${backendUrl}/uploads/${image}` : ''} alt="" />
      <div className="article_date">{date? date : ''}</div>
      <h3>{title? title : ''}</h3>
    </Link>
  )
}

export default article
