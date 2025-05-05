import React from 'react'
import { useEffect } from 'react'
//api url
import { useApiUrl } from '../context/apiContext'
//nav imports
import PublicNav from '../components/publicNav'
import PublicFooter from '../components/publicFooter'
//import css
import '../css/contact.css'

const contact = () => {
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
        body: JSON.stringify({ page: 'contact' })
      })
      const result = await response.json()
      if(result.error)
        alert(result.error)

    } catch (error) {
      alert("Error: Couldn't update session info")
      console.log("Error updating session info:", error)
    }
  }

  //scroll animation
  useEffect(() => {
    document.title = "Contact Homely"
    
    //update session
    const upSesh = async () => {
      await updateSession()
    }
    upSesh()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target.classList.contains('animated')) {
          if (entry.isIntersecting)
            entry.target.classList.add('show')
          else
            entry.target.classList.remove('show')
        }
      });
    },
    { threshold: 0.1 })

    const animatedElements = document.querySelectorAll('.animated')
    animatedElements.forEach((el) => observer.observe(el))

    return () => {animatedElements.forEach((el) => observer.unobserve(el));}
  }, [])

  return (
    <>
      <PublicNav />

      <main>
        <section id="contact" className="double_topped lefted righted">
          <div id="inquiry" className='animated fade_in'>
            <h2>Inquiry</h2>
            <form>
              <input type="text" name="" id="" placeholder='Full name' required/>
              <input type="email" name="" id="" placeholder='Email address' required/>
              <input type="tel" name="" id="" placeholder='Phone number'/>
              <input type="text" name="" id="" placeholder='Subject' required/>
              <textarea name="" id="" cols="30" rows="10" placeholder='Message'></textarea>
              <button type="submit" className="cta form_submit"><p>Send</p></button>
            </form>
          </div>
          <div id="details" className='animated fade_in'>
            <h2>Details</h2>
            <ul>
              <li><a href="mailto:" target='blank'><p>contact@homely.com</p></a></li>
            </ul>
            <ul>
              <li><a href="" target='blank'><p>LinkedIn: @homely</p></a></li>
              <li><a href="" target='blank'><p>Facebook: @homely</p></a></li>
              <li><a href="" target='blank'><p>Twitter: @homely</p></a></li>
              <li><a href="" target='blank'><p>Instagram: @homely</p></a></li>
            </ul>
            <ul>
              <li><p>140 WEST 4TH STREET | NY, NY 10012</p></li>
              <li><p>140 WEST 4TH STREET | NY, NY 10012</p></li>
              <li><p>140 WEST 4TH STREET | NY, NY 10012</p></li>
            </ul>
          </div>
        </section>
      </main>

      <PublicFooter />
    </>
  )
}

export default contact