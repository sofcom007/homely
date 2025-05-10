import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
//api url
import { useApiUrl } from '../context/apiContext'
//import components
import AdminHeader from '../components/adminHeaderTop'
import FormModalWrapper from '../components/formModalWrapper'
import ConfirmModalWrapper from '../components/confirmModalWrapper'
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

const adminArticles = () => {
    document.title = 'Articles | Homely Admin'

    //navigate
    const navigate = useNavigate()
    
    //url
    const backendUrl = useApiUrl()

    //token
    const token = localStorage.getItem('token')

    //check if not authenticated
    async function checkNotAuth () {
      try {
        const response = await fetch(`${backendUrl}/users/check-unauthenticated`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if(response.status === 200)
          navigate('/login')
      } catch (error) {
        console.error("Error checking if not authenticated", error)
        alert("Error: Couldn't check if not authenticated")
      }
    }

    //create articles
    const [createModalOn, setCreateModalOn] = useState(false);
    const createTitleRef = useRef()
    const createThumbnailRef = useRef()
    const createContentRef = useRef()
    async function creatArticle() {
        try{
            //create form body
            const formData = new FormData()
            formData.append('title', createTitleRef.current.value)
            formData.append('thumbnail', createThumbnailRef.current.files[0])
            formData.append('content', createContentRef.current.value)
    
            //make the request
            const response = await fetch(`${backendUrl}/articles/create-article`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            })
    
            const result = await response.json()
    
            alert(result.message || result.error)

            //refresh data
            const artcs = await fetchArticles()
            setArticles(artcs) 

            if(response.status === 200) {
                createTitleRef.current.value = ""
                createThumbnailRef.current.value = ""
                createContentRef.current.value = ""
            }
        } catch (error) {
            alert("Error: couldn't create project")
            console.log("Error creating project: ", error)
        }
    }

    //read articles
    const [articles, setArticles] = useState()
    const contentNumber = useRef()
    useEffect(() => {
        if(articles){
            contentNumber.current.innerHTML = articles.length
            if(updateId){
                const article = articles.find(article => article._id === updateId)
                if(article)
                    setUMContent(article)
            }
        }
    }, [articles])
    async function fetchArticles() {
        try{
            const response = await fetch(`${backendUrl}/articles/read-articles`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            return(data)
        } catch (error) {
            alert("Error: couldn't fetch articles")
            console.error("Error fetching articles: ", error)
        }
    }

    //update articles
    const [updateModalOn, setUpdateModalOn] = useState(false)
    const [updateId, setUpdateId] = useState("")
    const [UMContent, setUMContent] = useState()
    useEffect(() => {
        if(UMContent){
            updateIdRef.current.value = UMContent._id
            updateTitleRef.current.value = UMContent.title
            updateThumbnailImgRef.current.src = `${backendUrl}/uploads/${UMContent.thumbnail}` 
            updateContentRef.current.value = UMContent.content
        }
    }, [UMContent])
    const updateIdRef = useRef()
    const updateTitleRef = useRef()
    const updateThumbnailRef = useRef()
    const updateThumbnailImgRef = useRef()
    const updateContentRef = useRef()
    async function updateArticle(){
        try{
            //create request body
            const formData = new FormData()
            formData.append("title", updateTitleRef.current.value)
            formData.append("content", updateContentRef.current.value)
            if(updateThumbnailRef.current.files)
                formData.append("thumbnail", updateThumbnailRef.current.files[0])
    
            //make the request
            const response = await fetch(`${backendUrl}/articles/update-article/${updateIdRef.current.value}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            })
            const result = await response.json()
            alert(result.message || result.error)

            //refresh data
            const artcs = await fetchArticles()
            setArticles(artcs) 
        } catch (error) {
            alert("Error: couldn't update article ")
            console.error("Error updating article: ", error)
        }
    }

    //delete single article
    const [delModalOn, setDelModalOn] = useState(false)
    const [delId, setDelId] = useState("")
    async function deleteSingleArticle() {
        try{
            const response = await fetch(`${backendUrl}/articles/delete-article/${delId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await response.json()
            alert(result.message || result.error)
    
            //refresh data
            const artcs = await fetchArticles()
            setArticles(artcs) 
        } catch (error) {
            alert("Error: couldn't delete article")
            console.error("Error deleting article: ", error)
        }
    }

    //delete all articles
    const [delAllModalOn, setDelAllModalOn] = useState(false);
    async function delAllArticles() {
        try{
            const response = await fetch(`${backendUrl}/articles/delete-articles`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await response.json()
            alert(result.message || result.error)
    
            //refresh data
            const artcs = await fetchArticles()
            setArticles(artcs)
        } catch (error) {
            alert("Error: couldn't delete all articles")
            console.error("Error deleting all article: ", error)
        }
    }

    
    useEffect(() => {
      //get articles
      const getArticles = async () => {
        const articles_ = await fetchArticles()
        setArticles(articles_)
      }
      getArticles()

      //check authentication
      const checkAuth = async () => {
        await checkNotAuth()
      }
      checkAuth()
    }, [])
      
  return (
    <>
        {/*create modal*/} 
        <FormModalWrapper id='create_modal' title='Create Article' modalVar={createModalOn} closeModal={() => {setCreateModalOn(false)}}>
            <form action="">
                <input type="text" ref={createTitleRef} name="article_title" id="" placeholder='Article title' required />
                <input type="file" ref={createThumbnailRef} name="article_thumbnail" id="" placeholder='Cover' required />
                <textarea ref={createContentRef} name="article_content" id="" cols="30" rows="10" placeholder='Content' required></textarea>
                <button className='cta form_submit' type="button" onClick={() => {creatArticle()}}><p>Create</p></button>
            </form>
        </FormModalWrapper>
        
        {/*update modal*/} 
        <FormModalWrapper id='update_modal' title='Update Article' modalVar={updateModalOn} closeModal={() => {setUpdateModalOn(false); setUMContent()}}>
            <form action="">
                <input type="text" ref={updateIdRef} name="" id="" style={{ display: "none" }} />
                <input type="text" ref={updateTitleRef} name="article_title" id="" placeholder='Article title' required />
                <input type="file" ref={updateThumbnailRef} name="article_thumbnail" id="" placeholder='Cover' required />
                <img src="" ref={updateThumbnailImgRef} alt="" style={{ width: '300px', maxWidth: '100%' }} />
                <textarea ref={updateContentRef} name="article_content" id="" cols="30" rows="10" placeholder='Content' required></textarea>
                <button className='cta form_submit' type="button" onClick={() => {updateArticle()}}><p>Update</p></button>
            </form>
        </FormModalWrapper>
        
        {/*delete single modal*/} 
        <ConfirmModalWrapper 
            title='Delete Single Article?'
            closeModal={() => {setDelModalOn(false)}}
            modalOn={delModalOn}
            message='Are you sure you want to delete this article? It cannot be recovered!'
            confirmFunction= {() => {deleteSingleArticle()}}
        />
        
        {/*delete all modal*/} 
        <ConfirmModalWrapper
            title='Delete All Articles?'
            closeModal={() => {setDelAllModalOn(false)}}
            modalOn={delAllModalOn}
            message='Are you sure you want to delete all the articles? They cannot be recovered!'
            confirmFunction= {() => {delAllArticles()}}
        />

        
        <section id="admin_header" className='three_quarter_topped half_bottomed fixed_lefted righted'>
            <AdminHeader title='Articles' noFilter={true} noCreate={false} noDel={false} openCreate={() => { setCreateModalOn(true) }} openDel={() => { setDelAllModalOn(true) }} openFilter={() => { setFiltersOn(!filtersOn) }} />
        </section>

        <section id="content" className="fixed_lefted righted bottomed">
            <p><span ref={contentNumber} className='numb_disp'></span> Elements displayed</p>
            <table id="content_table">
                <thead>
                    <tr id='ct_head'>
                        <th><p>Date</p></th>
                        <th><p>Title</p></th>
                        <th className='action_head'><p>Actions</p></th>
                    </tr>
                </thead>
                {articles? 
                    <tbody>
                        {articles.map(article => (
                            <tr key={article._id}>
                                <td data-label="Date"><p>{new Date(article.updatedAt).toISOString().split("T")[0]}</p></td>
                                <td data-label="Title"><p>{article.title}</p></td>
                                <td data-label="Actions" className='action_cell'>
                                    <button className="edit_btn cta" onClick={() => { setUpdateModalOn(true); setUpdateId(article._id); setUMContent(article) }}><FontAwesomeIcon icon={faPencil}/></button>
                                    <button className="del_btn cta red"><FontAwesomeIcon icon={faTrash} onClick={() => { setDelModalOn(true); setDelId(article._id) }}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                : null}
            </table>
        </section>
    </>
  )
}

export default adminArticles