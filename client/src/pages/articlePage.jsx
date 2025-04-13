import React from 'react'
import { Link, useNavigate } from 'react-router'
//import css
import '../css/projects_articles.css'
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
//import components
import PublicNav from '../components/publicNav'
import PublicFooter from '../components/publicFooter'
import Article from '../components/article'


const articlePage = () => {
    const navigate = useNavigate()

  return (
    <>
      <PublicNav />

      <main>
        <section className='double_topped bottomed lefted righted'>
          <p id='return_link' onClick={() => {navigate(-1)}}><FontAwesomeIcon icon={faChevronLeft} /> Return</p>
          
          <img id='image' src="" alt="" />
          
          <h1>This is The Title of The Article</h1>

          <div id="content">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit totam aspernatur magnam laboriosam, molestiae voluptas dolor at quod quasi ex deserunt, modi facere voluptates corrupti unde recusandae facilis fuga aut?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis aliquid, expedita, quasi laudantium recusandae accusamus dignissimos illo sapiente quod ad nam eum consequatur aperiam beatae repellendus, quia explicabo labore sit?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati magni esse voluptatibus atque amet dicta, cumque corporis illum distinctio dolore praesentium inventore reiciendis culpa sunt autem placeat error excepturi architecto!
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur dicta odit nulla autem voluptas dolorum culpa eaque blanditiis incidunt. Omnis eligendi nihil culpa ratione vitae neque aperiam modi corporis veniam!
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio rem quisquam recusandae ex et quod quasi temporibus impedit tenetur ipsam suscipit inventore numquam fugiat cumque, eveniet provident obcaecati sapiente? Beatae?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, sunt ea. Temporibus enim debitis, obcaecati accusamus ad nihil molestiae. Animi officiis dolore quibusdam, ipsum reiciendis inventore modi vero? Odit, recusandae?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi et, quia reiciendis cumque ab corrupti ex voluptates veritatis praesentium impedit perferendis facilis natus autem sint fugiat libero esse aliquam possimus?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ipsa aliquid autem rerum odit facilis, fugiat laborum aut nesciunt sapiente dicta cupiditate nobis voluptatum vero totam possimus aliquam rem labore!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quibusdam architecto ducimus magni exercitationem sapiente odio unde? Beatae veritatis aliquid repellendus harum, sapiente minima suscipit autem est, repudiandae excepturi aspernatur?
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis dicta officia alias odit mollitia nihil, quod repudiandae at doloremque autem eveniet vero aperiam repellendus. Placeat unde quasi omnis ex hic?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quia voluptas vel neque placeat similique laboriosam omnis a suscipit harum dolor, nihil illum voluptates laborum eius expedita maxime totam? Enim.
            </p>
          </div>
        </section>
        <section id="recoms" className="lefted righted bottomed">
            <h3>Recent articles</h3>
            <div id="articles">
                <Article 
                image=""
                title="Title of an article 1"
                date="00.00.0000"
                />
                <Article 
                image=""
                title="Title of an article 1"
                date="00.00.0000"
                />
            </div>
        </section>
      </main>

      <PublicFooter />
    </>
  )
}

export default articlePage