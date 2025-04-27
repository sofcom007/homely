import React from 'react'
import { useEffect, useState } from 'react'
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
  //fetch awards
  const [awards, setAwards] = useState()
  async function fetchAwards(){
    try{
        const response = await fetch('http://localhost:8080/awards/read-awards', {
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
  useEffect(() => {
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
  }, [awards, staff])
  async function fetchStaff() {
    try{
        const response = await fetch('http://localhost:8080/staff/read-staff', {
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
  }, [])

  return (
    <>
      <PublicNav />

      <main>
        <section id="desc_sec" className='double_topped double_bottomed lefted righted'>
          <div id="dsc_top">
            <h1 className='animated fade_in'>Tagline of Homely Architecture Agency</h1>
            <img src={heroDesc} alt="" className='animated fade_in' />
          </div>
          <div id="dsc_txt">
            <p className='animated fade_in'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed consectetur molestiae voluptates quibusdam amet? At sed, quibusdam beatae consequuntur mollitia quas exercitationem pariatur omnis modi. Veniam omnis expedita quam voluptatibus.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio excepturi, incidunt earum similique reiciendis modi libero doloremque provident. Possimus a qui fugit eos libero voluptate rem error eveniet necessitatibus sed?
            </p>
            <p className='animated fade_in'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed consectetur molestiae voluptates quibusdam amet? At sed, quibusdam beatae consequuntur mollitia quas exercitationem pariatur omnis modi. Veniam omnis expedita quam voluptatibus.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio excepturi, incidunt earum similique reiciendis modi libero doloremque provident. Possimus a qui fugit eos libero voluptate rem error eveniet necessitatibus sed?
            </p>
          </div>
        </section>

        <section id="philo_sec" className="double_bottomed lefted righted">
          <h2 className='animated fade_in'>Our Philosophy</h2>
          <p className='animated fade_in'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique recusandae esse aut nihil praesentium nesciunt. Pariatur repellat tenetur voluptates, quidem nulla, nisi inventore iure beatae, odio dolores earum dolorum fugiat.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint voluptate recusandae ipsum assumenda harum error est ex accusamus fugiat esse repellendus nobis sapiente doloremque dolorem, corporis, amet, alias unde dicta.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem recusandae placeat cumque dolor quos cum illum, sit aut rerum voluptas tenetur minus ut, fuga, animi ea! Adipisci quasi autem sapiente.
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
                  img={award.picture? `http://localhost:8080/uploads/${award.picture}` : ""}
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
                  img={member.picture? `http://localhost:8080/uploads/${member.picture}` : ""}
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