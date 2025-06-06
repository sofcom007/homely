import React from 'react'
import { Link } from 'react-router'

const ctaSec = () => {
  return (
    <section id='cta_section' className='lefted righted topped bottomed animated fade_in'>
        <h2>Let's Build a Home Together</h2>
        <Link to="/contact" className="cta"><p>Contact us</p></Link>
    </section>
  )
}

export default ctaSec
