import React, { useState, useEffect, useRef } from 'react'
import logo from '../assets/images/branding/homely_symbol_logo.png'
import { Link , NavLink} from 'react-router'
import "../css/admin_nav.css"
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group'

const adminNav = () => {
  const [navOn, setNavOn] = useState( window.innerWidth > 1080 )
  const [width, setWidth] = useState( 0 )

  const divRef = useRef(null)

  useEffect(() => {
    if(divRef.current){
        const newWidth = divRef.current.offsetWidth
        setWidth(newWidth)
    }
  }, [])

  return (
    <>
        {window.innerWidth < 1600? <div id="admin_btn" onClick={() => {setNavOn(!navOn)}}>&#9776;</div> : null}
        <div id='admin_nav_holder' style={{ width: `${navOn? width + 50 : 0}px`, minWidth: `${navOn? width + 50 : 0}px` }}>
            <nav id='admin_nav' ref={divRef}>
                <img src={logo} alt="" />
                <ul>
                    <li><NavLink to='/the-under-belly' end className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Dashboard</p></NavLink></li>
                    <li><NavLink to='/the-under-belly/projects' className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Projects</p></NavLink></li>
                    <li><NavLink to='/the-under-belly/articles' className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Articles</p></NavLink></li>
                    <li><NavLink to='/the-under-belly/awards' className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Awards</p></NavLink></li>
                    <li><NavLink to='/the-under-belly/staff' className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Staff</p></NavLink></li>
                    <li><NavLink to='/the-under-belly/users' className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Users</p></NavLink></li>
                </ul>
            </nav>
        </div>
    </>
  )
}

export default adminNav