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

const adminUsers = () => {
    document.title = 'Users | Homely Admin'
    
    //navigate
    const navigate = useNavigate()
    //url
    const backendUrl = useApiUrl()
    
    //token
    const token = localStorage.getItem('token')

    //filtering
    const [filtersOn, setFiltersOn] = useState(false)
    const filterPermission = useRef()

    //fetch users
    const [users, setUsers] = useState()
    const contentNumber = useRef()
    useEffect(() => {
        if(users) {
            contentNumber.current.innerHTML = users.length
            if(updateId){
                const usr = users.find(user => user._id === updateId)
                setUMContent(usr)
            }
        }
    }, [users])
    async function fetchUsers() {
        try {
            //make request
            const response = await fetch(`${backendUrl}/users/read-users`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await response.json()
            if(result.message)
                return alert(result.message)

            //filter users
            let newUsers = result
            if(filterPermission.current.value != '')
                newUsers = result.filter(result => result.permission === filterPermission.current.value)

            return newUsers
        } catch (error) {
            alert("Error: Couldn't fetch users")
            console.error("Error fetching users:", error)
        }
    }

    //create user
    const [createModalOn, setCreateModalOn] = useState(false)
    const newFirstNameRef = useRef()
    const newLastNameRef = useRef()
    const newUsernameRef = useRef()
    const newPermissionRef = useRef()
    const newEmailRef = useRef()
    const newPhoneRef = useRef()
    const newPasswordRef = useRef()
    const newPictureRef = useRef()
    async function createUser() {
        try {
            //assemble request body
            const formData = new FormData()
            formData.append('firstName', newFirstNameRef.current.value)
            formData.append('lastName', newLastNameRef.current.value)
            formData.append('username', newUsernameRef.current.value)
            formData.append('permission', newPermissionRef.current.value)
            formData.append('email', newEmailRef.current.value)
            formData.append('phone', newPhoneRef.current.value)
            formData.append('password', newPasswordRef.current.value)
            if(newPictureRef.current.files)
                formData.append('picture', newPictureRef.current.files[0])

            //make request
            const response = await fetch(`${backendUrl}/users/create-user`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData,
                credentials: 'include'
            })
            const result = await response.json()
            alert(result.message || result.error)

            //clear fields
            if(response.status === 200) {
                newFirstNameRef.current.value = ''
                newLastNameRef.current.value = ''
                newUsernameRef.current.value = ''
                newPermissionRef.current.value = ''
                newEmailRef.current.value = ''
                newPhoneRef.current.value = ''
                newPasswordRef.current.value = ''
                newPictureRef.current.value = ''
            } 

            //refresh data
            const usrs = await fetchUsers()
            setUsers(usrs)
        } catch (error) {
            alert("Error: couldn't create user")
            console.error("Error creating user:", error)
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
            updatePermissionRef.current.value = UMContent.permission
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
    const updatePermissionRef = useRef()
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
            formData.append('permission', updatePermissionRef.current.value)
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
            const usrs = await fetchUsers()
            setUsers(usrs)
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
            const usrs = await fetchUsers()
            setUsers(usrs)            
        } catch (error) {
            alert("Error: Couldn't delete user picture")
            console.error("Error deleting user picture:", error)
        }
    }

    //delete user
    const [delModalOn, setDelModalOn] = useState()
    const [delId, setDelId] = useState()
    async function deleteUser() {
        try {
            //make request
            const response = await fetch(`${backendUrl}/users/delete-user/${delId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await response.json()
            alert(result.message || result.error)

            //refresh data
            const usrs = await fetchUsers()
            setUsers(usrs)

            //close modal
            if(response.stauts === 200)
                setDelModalOn(false)
        } catch (error) {
            alert("Error: Couldn't delete user")
            console.error("Error deleting user:", error)
        }
    }

    //delete all users
    const [delAllModalOn, setDelAllModalOn] = useState(false)
    async function deleteAllUsers() {
        try {
            //make request
            const response = await fetch(`${backendUrl}/users/delete-all-users`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await response.json()
            alert(result.message || result.error)

            //refresh data
            const usrs = await fetchUsers()
            setUsers(usrs)

            //close modal
            if(response.status === 200)
                setDelAllModalOn(false)
        } catch (error) {
            alert("Error: Couldn't delete all users")
            console.error("Error deleting all users: ", error)
        }
    }

    useEffect(() => {
        const readUsers = async () => {
            const usrs = await fetchUsers()
            setUsers(usrs)
        }
        readUsers()
        
    }, [])
  
    return (
        <>
            {/*create modal*/} 
            <FormModalWrapper id='create_modal' title='Create Project' modalVar={createModalOn} closeModal={() => {setCreateModalOn(false)}}>
                <form action="">
                    <div className="input_holder">
                        <input ref={newFirstNameRef} type="text" name="" placeholder='First name' required/>
                        <input ref={newLastNameRef} type="text" name="" placeholder='Last name' required/>
                    </div>
                    <input ref={newUsernameRef} type="text" name="" placeholder='Username' required />
                    <div className="input_holder">
                        <input ref={newPictureRef} type="file" name="" />
                        <select ref={newPermissionRef} name="" required>
                            <option value="regular">Regular</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>
                    <div className="input_holder">
                        <input ref={newEmailRef} type="email" name="" placeholder='Email' required/>
                        <input ref={newPhoneRef} type="tel" name="" placeholder='Phone' required/>
                    </div>
                    <input ref={newPasswordRef} type="password" name="" placeholder='Password'/>
                    <button className='cta form_submit' type="button" onClick={() => { createUser() }}><p>Create</p></button>
                </form>
            </FormModalWrapper>
            
            {/*update modal*/} 
            <FormModalWrapper id='update_modal' title='Create Project' modalVar={updateModalOn} closeModal={() => {setUpdateModalOn(false)}}>
                <form action="">
                    <input ref={updateIdRef} type="text" name="" id="" style={{ display: 'none' }} />
                    <div className="input_holder">
                        <input ref={updateFirstNameRef} type="text" name="" placeholder='First name' required/>
                        <input ref={updateLastNameRef} type="text" name="" placeholder='Last name' required/>
                    </div>
                    <input ref={updateUsernameRef} type="text" name="" placeholder='Username' required />
                    <div className="input_holder">
                        <select ref={updatePermissionRef} name="" required>
                            <option value="regular">Regular</option>
                            <option value="admin">Administrator</option>
                        </select>
                        <input ref={updatePictureRef} type="file" name="" />
                    </div>
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
                </form>
            </FormModalWrapper>
            
            {/*delete single modal*/} 
            <ConfirmModalWrapper 
                title='Delete User?' 
                closeModal={() => {setDelModalOn(false)}} 
                modalOn={delModalOn} 
                message='Are you sure you want to delete this user? It cannot be recovered!'
                confirmFunction = {() => { deleteUser() }}
            />
            
            {/*delete all modal*/} 
            <ConfirmModalWrapper 
                title='Delete All?' 
                closeModal={() => {setDelAllModalOn(false)}} 
                modalOn={delAllModalOn} 
                message='Are you sure you want to delete the entire user base? They cannot be recovered!'
                confirmFunction = {() => { deleteAllUsers() }}
            />

            
            <section id="admin_header" className='three_quarter_topped half_bottomed fixed_lefted righted'>
                <AdminHeader title='Users' noFilter={false} noCreate={false} noDel={false} openCreate={() => { setCreateModalOn(true) }} openDel={() => { setDelAllModalOn(true) }} openFilter={() => { setFiltersOn(!filtersOn) }} />
                <AdminFilters filtersOn={filtersOn}>
                    <select ref={filterPermission} name="" onChange={async () => { setUsers(await fetchUsers()) }}>
                        <option value="">All</option>
                        <option value="regular">Regular</option>
                        <option value="admin">Administrator</option>
                    </select>
                </AdminFilters>
            </section>

            <section id="content" className="fixed_lefted righted bottomed">
                <p><span ref={contentNumber} className='numb_disp'></span> Elements displayed</p>
                <table id="content_table">
                    <thead>
                        <tr id="ct_head">
                            <th><p>Permission</p></th>
                            <th><p>Username</p></th>
                            <th><p>Email</p></th>
                            <th className='action_head'><p>Actions</p></th>
                        </tr>
                    </thead>
                    {users? <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td data-label="Permission"><p>{user.permission}</p></td>
                                <td data-label="Username"><p>{user.username}</p></td>
                                <td data-label="Email"><p>{user.email}</p></td>
                                <td data-label="Actions" className='action_cell'>
                                    <button className="edit_btn cta" onClick={() => { setUpdateModalOn(true); setUpdateId(user._id); setUMContent(user) }}><FontAwesomeIcon icon={faPencil}/></button>
                                    <button className="del_btn cta red"><FontAwesomeIcon icon={faTrash} onClick={() => { setDelModalOn(true); setDelId(user._id) }}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody> : null}
                </table>
            </section>
        </>
    )
}

export default adminUsers