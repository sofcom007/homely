import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
//api url
import { useApiUrl } from '../context/apiContext'
//import components
import HorizontalGraph from '../components/horizontalGraph'
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

const adminProjects = () => {
    document.title = 'User | Homely Admin'

    //navigate
    const navigate = useNavigate()
    
    //url
    const backendUrl = useApiUrl()

    //token
    const token = localStorage.getItem('token')

    //fetch user
    async function fetchUser () {
        try {
            const response = await fetch (`${backendUrl}/users/read-user`, { 
                method: "GET", 
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await response.json()
            setUMContent(result)
        } catch (error) {
            console.error("Error fetching user:", error)
            alert("Error: Couldn't fetch user")
        }
    }

    //logout
    async function logout() {
        try {
            const response = await fetch(`${backendUrl}/users/logout`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status === 200) {
                localStorage.setItem('token', null)
                navigate('/login')
            }
        } catch (error) {
            alert("Error: couldn't logout")
            console.error("Error logging out:", error)
        }
    }

    //update user
    const [updateModalOn, setUpdateModalOn] = useState()
    const [UMContent, setUMContent] = useState()
    useEffect(() => {
        if(UMContent){
            updateIdRef.current.value = UMContent._id
            updateFirstNameRef.current.value = UMContent.firstName
            updateLastNameRef.current.value = UMContent.lastName
            updateUsernameRef.current.value = UMContent.username
            updateEmailRef.current.value = UMContent.email
            updatePhoneRef.current.value = UMContent.phone
            updatePasswordRef.current.value = ''
            if(UMContent.picture){
                updatePictureHolderRef.current.style.display = 'block'
                updatePictureElRef.current.src = `${backendUrl}/uploads/${UMContent.picture}`
            } else {
                updatePictureHolderRef.current.style.display = 'none'
                updatePictureElRef.current.src = null
            }
        } else {
                updatePictureHolderRef.current.style.display = 'none'
                updatePictureElRef.current.src = null
        }
    }, [UMContent])
    const [updateId, setUpdateId] = useState()
    const updateIdRef = useRef()
    const updateFirstNameRef = useRef()
    const updateLastNameRef = useRef()
    const updateUsernameRef = useRef()
    const updateEmailRef = useRef()
    const updatePhoneRef = useRef()
    const updatePasswordRef = useRef()
    const updatePictureRef = useRef()
    const updatePictureHolderRef = useRef()
    const updatePictureElRef = useRef()
    async function updateUser() {
        try {
            //create request body
            const formData = new FormData()
            formData.append('firstName', updateFirstNameRef.current.value)
            formData.append('lastName', updateLastNameRef.current.value)
            formData.append('username', updateUsernameRef.current.value)
            formData.append('email', updateEmailRef.current.value)
            formData.append('phone', updatePhoneRef.current.value)
            formData.append('password', updatePasswordRef.current.value)
            if(updatePictureRef.current.files)
                formData.append('picture', updatePictureRef.current.files[0])            

            //make request
            const response = await fetch(`${backendUrl}/users/update-user/${updateIdRef.current.value}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            })
            const result = await response.json()
            alert(result.message || result.error)
            
            //clear picture field
            updatePictureRef.current.value = ""

            //refresh data
            await fetchUser()
        } catch (error) {
            alert("Error: Couldn't update user")
            console.error("Error updating user: ", error)
        }
    }

    //delete user picture
    async function deleteUserPicture() {
        try {
            //make request
            const response = await fetch(`${backendUrl}/users/delete-user-picture/${updateIdRef.current.value}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await response.json()
            alert(result.message || result.error)
            
            //refresh data
            await fetchUser() 
        } catch (error) {
            alert("Error: Couldn't delete user picture")
            console.error("Error deleting user picture:", error)
        }
    }

    useEffect(() => {
        //get user
        const getUser = async () => {
            await fetchUser()
        }
        getUser()
    }, [])
        
    return (
        <>
            <section id="user" className="fixed_lefted righted three_quarter_topped bottomed">
                <div id="user_header">
                    <img src={UMContent? `${backendUrl}/uploads/${UMContent.picture}` : null} alt="" />
                    <div>
                        <h1>{UMContent? UMContent.fullName : "N/A"}</h1>
                        <h3>{UMContent? UMContent.permission : "N/A"}</h3>
                        <button className="cta red" onClick={() => { logout() }}><p>Log out</p></button>
                    </div>
                </div>
                <div id="update_user">
                    <h2>Update user</h2>
                    <input ref={updateIdRef} type="text" name="" id="" style={{ display: 'none' }} />
                    <div className="input_holder">
                        <input ref={updateFirstNameRef} type="text" name="" placeholder='First name' required/>
                        <input ref={updateLastNameRef} type="text" name="" placeholder='Last name' required/>
                    </div>
                    <input ref={updateUsernameRef} type="text" name="" placeholder='Username' required />
                    <input ref={updatePictureRef} type="file" name="" />
                    <div ref={updatePictureHolderRef} className="modal_picture" style={{ width: '300px', maxWidth: '100%', marginBottom: '10px'}}>
                        <img ref={updatePictureElRef} src={null} alt="" style={{ width: '100%' }} />
                        <button type='button' className="picture_del"><FontAwesomeIcon icon={faTrash} onClick={() => { deleteUserPicture() }} /></button>
                    </div>
                    <div className="input_holder">
                        <input ref={updateEmailRef} type="email" name="" placeholder='Email' required/>
                        <input ref={updatePhoneRef} type="tel" name="" placeholder='Phone' required/>
                    </div>
                    <input ref={updatePasswordRef} type="password" name="" placeholder='Password'/>
                    <button className='cta form_submit' type="button" onClick={() => { updateUser() }}><p>Update</p></button>
                </div>
            </section>
        </>
    )
}

export default adminProjects