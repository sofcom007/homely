import React from 'react'
import { useEffect } from 'react'
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
  //scroll animation
  useEffect(() => {
    document.title = "About Homely"

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
            <DropDownSec 
              text1='20XX'
              text2='Award name title'
              img=''
              paragraph='Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste!'
            />
            <DropDownSec 
              text1='20XX'
              text2='Award name title'
              img=''
              paragraph='Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste!'
            />
            <DropDownSec 
              text1='20XX'
              text2='Award name title'
              img=''
              paragraph='Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste!'
            />
            <DropDownSec 
              text1='20XX'
              text2='Award name title'
              img=''
              paragraph='Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste!'
            />
          </div>
        </section>

        <section id="team_sec" className="double_bottomed lefted righted">
          <h2 className='animated fade_in'>Our Team</h2>
          <div id="team">
            <DropDownSec 
              text1='John Doe'
              text2='Team member full name'
              img=''
              paragraph='Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste!'
            />
            <DropDownSec 
              text1='John Doe'
              text2='Team member full name'
              img=''
              paragraph='Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste!'
            />
            <DropDownSec 
              text1='John Doe'
              text2='Team member full name'
              img=''
              paragraph='Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste!'
            />
            <DropDownSec 
              text1='John Doe'
              text2='Team member full name'
              img=''
              paragraph='Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quisquam animi ullam veniam quas cupiditate quidem qui exercitationem vel? Corporis doloremque delectus corrupti assumenda fugiat ex in, atque veniam iste!'
            />
            <DropDownSec 
              text1='John Doe'
              text2='Team member full name'
              img=''
              paragraph=''
            />
            <DropDownSec 
              text1='John Doe'
              text2='Team member full name'
              img=''
              paragraph=''
            />
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