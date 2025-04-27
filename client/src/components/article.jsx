import React from 'react'
import { Link } from 'react-router'

const article = ({ image, title, date, link }) => {
  return (
    <Link to={`/articles/${link}`} className='article animated fade_in'>
      <img src={image} alt="" />
      <div className="article_date">{date}</div>
      <h3>{title}</h3>
    </Link>
  )
}

export default article
