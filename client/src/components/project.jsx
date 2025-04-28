import React from 'react'
import { useRef } from 'react'
import { Link } from 'react-router'
//api url
import { useApiUrl } from '../context/apiContext'

const Project = ({image, name, link, ref}) => {
  //url
  const backendUrl = useApiUrl()

  const imgRef = useRef()

  return (
    <div className='project animated fade_in' ref={ref? ref : null}>
        <img ref={imgRef} src={image? `${backendUrl}/uploads/${image}` : ''} alt={name} />
        <div className="project_txt" style={{ maxWidth: imgRef.current? imgRef.current.clientWidth + "px" : "100%" }}>
            <h3>{name}</h3>
            <Link to={ `/portfolio/${link}` } className='cta'><p>View</p></Link>
        </div>
    </div>
  )
}

export default Project