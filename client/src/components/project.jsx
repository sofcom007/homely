import React from 'react'
import { Link } from 'react-router'
import "../css/public_nav.css"

const project = ({image, name, link}) => {
  return (
    <div className='project'>
        <img src={image} alt="" />
        <div className="project_txt">
            <h3>{name}</h3>
            <Link to='/portfolio/a54dve5r4fev4' className='cta'><p>View</p></Link>
        </div>
    </div>
  )
}

export default project