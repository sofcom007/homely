import React from 'react'
import { Link } from 'react-router'

const article = ({ image, title, date, link }) => {
  return (
    <Link to={'/articles/475'} className='article animated fade_in'>
      <img src={image} alt="" />
      <h3>{title}</h3>
      <div className="article_date">{date}</div>
    </Link>
  )
}

export default article
