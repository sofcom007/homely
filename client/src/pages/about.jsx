import React from 'react'
import { useEffect, useState } from 'react'
//api url
import { useApiUrl } from '../context/apiContext'
//scroll animation
import { scrollAnim } from '../components/scrollAnim'
//nav imports
import PublicNav from '../components/publicNav'
import PublicFooter from '../components/publicFooter'
//import css
import '../css/about.css'
//import images
import staffPic from '../assets/images/about/staff_picture.webp'
import heroDesc from '../assets/images/about/about_desc.webp'
//import components
import DropDownSec from '../components/dropDownSec'

const about = () => {
  //url
  const backendUrl = useApiUrl()
  
  //fetch awards
  const [awards, setAwards] = useState()
  async function fetchAwards(){
    try{
        const response = await fetch(`${backendUrl}/awards/read-awards`, {
            method: "GET"
        })
        const result = await response.json()
        //console.log(result)
        if(result.message)
            return alert(result.message)
        
        setAwards(result)
    } catch (error) {
        alert("Error: Couldn't read awards")
        console.error("Error reading awards: ", error)
    }
  }
  
  //fetch staff
  const [staff, setStaff] = useState()
  useEffect(() => { scrollAnim() }, [awards, staff])
  async function fetchStaff() {
    try{
        const response = await fetch(`${backendUrl}/staff/read-staff`, {
            method: "GET"
        })
        const result = await response.json()
        if(response.message)
            return alert(response.message)
        setStaff(result)
    } catch (error) {
        alert("Error: Couldn't read staff")
        console.error("Error fetching staff:", error)
    }
  }

  //scroll animation
  useEffect(() => {
    document.title = "About Homely"

    fetchAwards()
    fetchStaff()

    //scroll animation
    scrollAnim()
  }, [])

  return (
    <>
      <PublicNav />

      <main>
        <section id="desc_sec" className='double_topped double_bottomed lefted righted'>
          <div id="dsc_top">
            <h1 className='animated fade_in'> Our Story: Building with Heart and Purpose </h1>
            <img src={heroDesc} alt="" className='animated fade_in' />
          </div>
          <div id="dsc_txt">
            <p className='animated fade_in'>
              Homely was founded on September 3rd, 2016, with a simple but powerful idea: to create homes that feel as lasting and welcoming as the memories made inside them.
              What began as a small, passionate team has grown into a full-service architectural agency known for its commitment to craftsmanship, sustainability, and human-centered design.
              From the very beginning, our focus has been on building not just houses, but enduring spaces that people are proud to call home.
            </p>
            <p className='animated fade_in'>
              Our philosophy is rooted in respect — for the people who live in the homes we design, and for the environment we all share.
              We believe great architecture balances beauty with responsibility, combining timeless materials and thoughtful layouts with energy-efficient practices.
              Every project we take on is an opportunity to create something meaningful: a home that stands strong for generations while treading lightly on the earth.
            </p>
          </div>
        </section>

        <section id="philo_sec" className="double_bottomed lefted righted">
          <h2 className='animated fade_in'>A Commitment to Homes That Endure and Inspire</h2>
          <p className='animated fade_in'>
            At Homely, our philosophy has always been clear: to design homes that are built to last — homes that nurture the lives within them and honor the world beyond their walls.
            We believe that true architecture doesn’t chase trends; it embraces timeless principles of comfort, durability, and environmental stewardship.
            Every home we create is shaped by a deep respect for human needs, blending natural light, thoughtful materials, and practical layouts to support daily life with ease and beauty.
            Just as importantly, we are committed to reducing our ecological footprint by making responsible choices at every stage of the design and building process.
            From sustainable sourcing to energy-efficient solutions, we aim to craft spaces that feel good to live in and do good for the planet.
            For us, designing a home isn’t just about today — it’s about shaping a future where homes are not only loved by their owners, but also respected by the generations yet to come.
          </p>
        </section>

        <section id="awards_sec" className="double_bottomed lefted righted">
          <h2 className='animated fade_in'>Our Awards</h2>
          <div id="awards">
            {awards && awards.map((award, i) => {
              return(
                <DropDownSec 
                  text1={new Date(award.date).getUTCFullYear()}
                  text2={award.name}
                  img={award.picture?  award.picture : ""}
                  paragraph={award.description}
                  key={i}
                />
              )
            })}
          </div>
        </section>

        <section id="team_sec" className="double_bottomed lefted righted">
          <h2 className='animated fade_in'>Our Team</h2>
          <div id="team">
            {staff && staff.map((member, i) => {
              return(
                <DropDownSec 
                  text1={member.firstName + " " + member.lastName}
                  text2={member.position}
                  img={member.picture? member.picture : ""}
                  paragraph={member.description}
                  key={i}
                />
              )
            })}
          </div>
        </section>

        <section id="abt_bottom" className='lefted righted'>
          <img src={staffPic} className='animated fade_in' alt="The staff of Homely posing for a group picture alongside Max, one of our employee's dog and our mascot" />
        </section>
      </main>

      <PublicFooter />
    </>
  )
}

export default about