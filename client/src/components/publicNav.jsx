import React, { useState, useEffect, useRef } from 'react'
import logo from '../assets/images/branding/homely_symbol_logo.png'
import { Link , NavLink} from 'react-router'
import "../css/public_nav.css"

const publicNav = () => {
  const [navOn, setNavOn] = useState( false )

  const navRef = useRef()
  const navBtnRef = useRef()

  useEffect(() => {
    let lastScroll = window.scrollY
    let scrollInitialized = false
    let transformOffset = 0
    const navHeight = navRef.current.clientHeight
    const transitionDuration = 0.5 //in seconds

    //toggle on scroll
    function initializeScroll(){
      if( !scrollInitialized ){
        //adjust the offset
        if(window.scrollY < navHeight)
          transformOffset = window.scrollY
        else
          transformOffset = navHeight
        
        //apply the offset
        if(navBtnRef.current) navBtnRef.current.style.transform = `translateY(${-transformOffset}px)`
        if(navRef.current) navRef.current.style.transform = `translateY(${-transformOffset}px)`

        //initialize scroll
        scrollInitialized = true
      }
    }
    function toggleNavOnScroll() {
      if( scrollInitialized ) {
        //get scroll direction
        let scrollingUp = false
        if(lastScroll > window.scrollY)
          scrollingUp = true

        //adjust the offset according to scroll direction
        if(scrollingUp){
          if(navBtnRef.current) navBtnRef.current.style.transition = `transform ${transitionDuration}s`
          if(navRef.current) navRef.current.style.transition = `transform ${transitionDuration}s`
          
          const deltaScroll = Math.abs(window.scrollY - lastScroll)
          if(deltaScroll > 3)
            transformOffset = 0        
        } else {
          if(navBtnRef.current) navBtnRef.current.style.transition = 'transform 0s'
          if(navRef.current) navRef.current.style.transition = 'transform 0s'
          
          const deltaScroll = Math.abs(window.scrollY - lastScroll)
          transformOffset += deltaScroll
        }
      }
      
      //clamp the offset
      if(transformOffset < 0)
        transformOffset = 0
      else if (transformOffset > navHeight)
        transformOffset = navHeight

      //apply the offset
      if(navBtnRef.current) navBtnRef.current.style.transform = `translateY(${-transformOffset}px)`  
      if(navRef.current) navRef.current.style.transform = `translateY(${-transformOffset}px)`  

      //reset last scroll
      lastScroll = window.scrollY
    }
    initializeScroll()
    window.addEventListener('scroll', () => { toggleNavOnScroll() })
  }, [])

  return (
    <>
      <nav ref={navRef} id='public_nav'>
          <Link to="/"><img src={logo} alt="" /></Link>        
          <ul>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>About</p></NavLink></li>
            <li><NavLink to="/portfolio" className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Portfolio</p></NavLink></li>
            <li><NavLink to="/articles" className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Articles</p></NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Contact</p></NavLink></li>
          </ul>
      </nav>
      <button ref={navBtnRef} id="p_mnav_btn" onClick={() => {setNavOn(!navOn)}}>&#9776;</button>

      <nav id="public_mobile_nav" className={navOn? "on": ""}>       
          <ul>
            <li><NavLink to="/" className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Home</p></NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>About</p></NavLink></li>
            <li><NavLink to="/portfolio" className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Portfolio</p></NavLink></li>
            <li><NavLink to="/articles" className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Articles</p></NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Contact</p></NavLink></li>
          </ul>      
      </nav>
    </>
  )
}

export default publicNav