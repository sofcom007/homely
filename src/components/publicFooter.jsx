import React from 'react'
import textLogo from '../assets/images/branding/homely_text_symbol_logo.png'
import { Link } from 'react-router'
import "../css/public_nav.css"

const publicNav = () => {
    return (
    <>
        <footer id='public_footer' className='double_topped bottomed lefted righted'>
            <Link to="/"><img src={textLogo} alt="" /></Link>
            <div id="pf_bottom">
                <p>&copy; 2025 Atlasoft. All rights reserved.</p>
                <ul>
                    <li><a href=""><p>Linkedin</p></a></li>
                    <li><a href=""><p>Facebook</p></a></li>
                    <li><a href=""><p>Twitter</p></a></li>
                    <li><a href=""><p>Instagram</p></a></li>
                </ul>
            </div>
        </footer>
    </>
  )
}

export default publicNav