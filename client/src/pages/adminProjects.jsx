import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
//api url
import { useApiUrl } from '../context/apiContext'
//import components
import AdminHeader from '../components/adminHeaderTop'
import AdminFilters from '../components/adminFilters'
import FormModalWrapper from '../components/formModalWrapper'
import ConfirmModalWrapper from '../components/confirmModalWrapper'
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

const adminProjects = () => {
    document.title = 'Projects | Homely Admin'

    //navigate
    const navigate = useNavigate()
    
    //url
    const backendUrl = useApiUrl()

    //token
    const token = localStorage.getItem('token')
  
    //filter projects
    const [filtersOn, setFiltersOn] = useState(false)
    const filterStatus = useRef()
    
    //create modal
    const [createModalOn, setCreateModalOn] = useState(false)
    //create modal fields
    const createNameRef = useRef()
    const createStatusRef = useRef()
    const createCoverRef = useRef()
    const createPicturesRef = useRef()
    const createDescriptionRef = useRef()
    const createBtnRef = useRef()
    //create project request
    async function createProject() {
        //create request body
        const formData = new FormData()
        formData.append("name", createNameRef.current.value)
        formData.append("status", createStatusRef.current.value)
        formData.append("cover", createCoverRef.current.files[0])
        formData.append("description", createDescriptionRef.current.value)
        for (let i = 0; i < createPicturesRef.current.files.length; i++){
            const picture = createPicturesRef.current.files[i]
            formData.append("pictures", picture)
        }

        //make request
        const response = await fetch(`${backendUrl}/projects/create-project`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: formData
        });
        const result = await response.json();
        alert(result.message || result.error);

        //refresh projects and close modal
        const prjs = await fetchProjects()
        setProjects(prjs)
        if(response.status === 200){
            //clear create form fields
            createNameRef.current.value = ""
            createStatusRef.current.value = ""
            createCoverRef.current.value = ""
            createPicturesRef.current.value = ""
            createDescriptionRef.current.value = ""
        }
    }


    //update modal
    const [editModalOn, setEditModalOn] = useState(false)
    const [EMContent, setEMContent] = useState()
    useEffect(() => {
        if(EMContent){
            updateIdRef.current.value = EMContent._id
            updateNameRef.current.value = EMContent.name
            updateStatusRef.current.value = EMContent.status
            updateDescriptionRef.current.value = EMContent.description
        }
    }, [EMContent])
    const [editId, setEditId] = useState("")
    //update modal fields
    const updateIdRef = useRef()
    const updateNameRef = useRef()
    const updateStatusRef = useRef()
    const updateCoverRef = useRef()
    const updatePicturesRef = useRef()
    const updateDescriptionRef = useRef()
    const updateBtnRef = useRef()
    //update project request
    async function updateProject() {
        //create request body
        const formData = new FormData()
        formData.append("name", updateNameRef.current.value)
        formData.append("status", updateStatusRef.current.value)
        if(updateCoverRef.current.files){
            formData.append("cover", updateCoverRef.current.files[0])
        }
        formData.append("description", updateDescriptionRef.current.value)
        if(updatePicturesRef.current.files)
            for (let i = 0; i < updatePicturesRef.current.files.length; i++){
                const picture = updatePicturesRef.current.files[i]
                formData.append("pictures", picture)
            }

        //make request
        const response = await fetch(`${backendUrl}/projects/update-project/${updateIdRef.current.value}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: formData
        })
        const result = await response.json()
        alert(result.message || result.error)

        if(response.status === 200)
            updatePicturesRef.current.value = ''

        //refresh projects
        const prjs = await fetchProjects()
        setProjects(prjs)
    }

    //read projects
    const [projects, setProjects] = useState([])
    const contentNumber = useRef()
    useEffect(() => {
        if(projects) {
            contentNumber.current.innerHTML = projects.length
            const project = projects.find(prj => prj._id === editId)
            setEMContent(project)
        }
    }, [projects])
    const fetchProjects = async () => {
        try{
            const response = await fetch(`${backendUrl}/projects/read-projects`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()

            //filter
            let newPrjs = data
            if(filterStatus.current.value != '')
                newPrjs = data.filter(prj => prj.status === filterStatus.current.value)

            return(newPrjs)
        } catch (error) {
            alert("Error: Couldn't fetch projects")
            console.error("Project fetching failed: ", error)
        }
    }

    //delete single project image
    async function delSinglePic(delPicture){
        try{
            const response = await fetch(`${backendUrl}/projects/delete-project-picture/${editId}/${delPicture}`, {
                method: 'DELETE',
                headers: {
                    "content-type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await response.json()
            alert(result.message || result.error)

            //refresh projects
            const prjs = await fetchProjects()
            setProjects(prjs)
        } catch (error) {
        alert("Error: Couldn't delete picture")
        console.error("Picture deletion failed: ", error)
        }
    }

    //delete single project
    const [delModalOn, setDelModalOn] = useState(false)
    const [delId, setDelId] = useState("")
    async function delSingle(){
        try{
            const response = await fetch(`${backendUrl}/projects/delete-project/${delId}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            const result = await response.json()

            alert(result.message || result.error)

            const prjs = await fetchProjects()
            setProjects(prjs)
            if(response.status === 200){
                setDelModalOn(false)
            }
        } catch (error) {
        alert("Error: Couldn't delete project")
        console.error("Project deletion failed: ", error)
        }
    }
    
    //delete all projects
    const [delAllModalOn, setDelAllModalOn] = useState(false)
    async function delAll(){
        try{
        const response = await fetch(`${backendUrl}/projects/delete-portfolio`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        const result = await response.json()

        alert(result.message || result.error)

        if(response.status === 200){
            const prjs = await fetchProjects()
            setProjects(prjs)
            setDelAllModalOn(false)
        }

        } catch (error) {
        alert("Error: Couldn't delete portfolio")
        console.error("Portfolio deletion failed: ", error)
        }
    }

    //general effects
    useEffect(() => {        
        //read
        const getProjects = async () => {
            const prjs = await fetchProjects()
            setProjects(prjs)
        }
        getProjects()

    }, [])
        
    return (
        <>
            {/*create modal*/} 
            <FormModalWrapper id='create_modal' title='Create Project' modalVar={createModalOn} closeModal={() => {setCreateModalOn(false)}}>
                <form id='create_form' action="" encotype="multipart/form-data">
                    <div className="input_holder">
                        <input type="text" ref={createNameRef} name="new_prj_name" id="new_name" placeholder='Project name' required />
                        <select ref={createStatusRef} name="new_prj_status" id="new_status">
                            <option value="ongoing">Ongoing</option>
                            <option value="complete">Complete</option>
                        </select>
                    </div>
                    <div className="input_holder">
                        <input type="file" ref={createCoverRef} name="new_prj_cover" id="new_cover" required/>
                        <input type="file" ref={createPicturesRef} name="new_prj_pictures" id="new_pictures" multiple required/>
                    </div>
                    <textarea ref={createDescriptionRef} name="new_prj_desc" id="new_desc" cols="30" rows="10" placeholder='Description' required></textarea>
                    <button ref={createBtnRef} className='cta form_submit' onClick={() => {createProject()}} type="button"><p>Create</p></button>
                </form>
            </FormModalWrapper>
            
            {/*update modal*/} 
            <FormModalWrapper id='edit_modal' title='Update Project' modalVar={editModalOn} closeModal={() => {setEditModalOn(false)}}>
                <form id='update_form' action="" encotype="multipart/form-data">
                    <input ref={updateIdRef} type="text" name="" id="" style={{ display: 'none' }}/>
                    <div className="input_holder">
                        <input ref={updateNameRef} type="text" name="edit_prj_name" id="edit_name" placeholder='Project name' required />
                        <select ref={updateStatusRef} name="edit_prj_status" id="edit_status">
                            <option value="ongoing">Ongoing</option>
                            <option value="complete">Complete</option>
                        </select>
                    </div>
                    <div id='edit_cover'>
                        <h5 style={{margin:0}}>Cover</h5>
                        <input ref={updateCoverRef} type="file" name="edit_prj_cover" id="edit_cover"/>
                        <img src={`${backendUrl}/uploads/${EMContent? EMContent.cover: ""}`} style={{ maxWidth: '100%', width: '300px' }} alt="" />
                    </div>
                    <div id='edit_pictures'>
                        <h5 style={{margin:0}}>Pictures</h5>
                        <input ref={updatePicturesRef} type="file" name="edit_prj_pictures" id="edit_pictures" multiple/>
                        {(EMContent && EMContent.pictures)? <div className='modal_picture_holder'>
                            {EMContent.pictures.map((picture, index) => (
                                <div key={index} className="modal_picture">
                                    <img src={`${backendUrl}/uploads/${EMContent? picture : ""}`} style={{ width: '100%' }} alt="" />
                                    <button type='button' className="picture_del"><FontAwesomeIcon icon={faTrash} onClick={() => {delSinglePic(picture)}} /></button>
                                </div>
                            ))}
                        </div> : null}
                    </div>
                    <textarea ref={updateDescriptionRef} name="edit_prj_desc" id="edit_desc" cols="30" rows="10" placeholder='Description' required></textarea>
                    <button ref={updateBtnRef} className='cta form_submit' onClick={() => {updateProject()}} type="button"><p>Update</p></button>
                </form>
            </FormModalWrapper>
            
            {/*delete modal all*/} 
            <ConfirmModalWrapper 
                title='Delete Entire Portoflio?'
                closeModal={() => {setDelAllModalOn(false)}}
                modalOn={delAllModalOn} message='Are you sure you want to delete the entire portfolio? They cannot be recovered!'
                confirmFunction = {() => {delAll()}}
            />
            
            {/*delete modal all*/} 
            <ConfirmModalWrapper
                title='Delete Single Project?'
                closeModal={() => {setDelModalOn(false)}}
                modalOn={delModalOn} message='Are you sure you want to delete this project? It cannot be recovered!'
                confirmFunction = {() => {delSingle()}}
            />
        
            <section id="admin_header" className='three_quarter_topped half_bottomed fixed_lefted righted'>
                <AdminHeader title='Projects' noFilter={false} noCreate={false} noDel={false} openCreate={() => { setCreateModalOn(true) }} openDel={() => { setDelAllModalOn(true) }} openFilter={() => { setFiltersOn(!filtersOn) }} />
                <AdminFilters filtersOn={filtersOn}>
                    <select ref={filterStatus} name="" onChange={async () => { setProjects(await fetchProjects()) }}>
                        <option value="">All</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="complete">Complete</option>
                    </select>
                </AdminFilters>
            </section>

            <section id="content" className="fixed_lefted righted bottomed">
                <p><span ref={contentNumber} className='numb_disp'></span> Elements displayed</p>
                <table id="content_table">
                    <thead>
                        <tr id='ct_head'>
                            <th><p>Status</p></th>
                            <th><p>Name</p></th>
                            <th className='action_head'><p>Actions</p></th>
                        </tr>
                    </thead>
                    {projects? 
                        <tbody>
                            {projects.map(project => (
                                <tr key={project._id}>
                                    <td data-label="Status"><p>{project.status}</p></td>
                                    <td data-label="Name"><p>{project.name}</p></td>
                                    <td data-label="Actions" className='action_cell'>
                                        <button className="edit_btn cta" onClick={() => { setEditModalOn(true); setEMContent(project); setEditId(project._id) }}><FontAwesomeIcon icon={faPencil}/></button>
                                        <button className="del_btn cta red"><FontAwesomeIcon icon={faTrash} onClick={() => { setDelModalOn(true); setDelId(project._id) }}/></button>
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

export default adminProjects