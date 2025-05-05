import React from 'react'
import { useState, useEffect, useRef } from 'react'
//api url
import { useApiUrl } from '../context/apiContext'
//import components
import AdminHeader from '../components/adminHeaderTop'
import FormModalWrapper from '../components/formModalWrapper'
import ConfirmModalWrapper from '../components/confirmModalWrapper'
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

const adminStaff = () => {
  document.title = 'Staff | Homely Admin'
    
  //url
  const backendUrl = useApiUrl()

  const [filtersOn, setFiltersOn] = useState(false)

  //fetch staff
  const [staff, setStaff] = useState()
  const contentNumber = useRef()
  useEffect(() => {
    if(staff) {
        contentNumber.current.innerHTML = staff.length
        const mbr = staff.find(member => member._id == updateId)
        setUMContent(mbr)
    }
  }, [staff])
  async function fetchStaff() {
    try{
        const response = await fetch(`${backendUrl}/staff/read-staff`, {
            method: "GET"
        })
        const result = await response.json()
        if(response.message)
            return alert(response.message)
        return result
    } catch (error) {
        alert("Error: Couldn't read staff")
        console.error("Error fetching staff:", error)
    }
  }

  //create staff member
  const [createModalOn, setCreateModalOn] = useState(false)
  const createFirstNameRef = useRef()
  const createLastNameRef = useRef()
  const createPositionRef = useRef()
  const createPictureRef = useRef()
  const createDescriptionRef = useRef()
  async function createMember(){
    try{
        //create the request body
        const formData = new FormData()
        formData.append('firstName', createFirstNameRef.current.value)
        formData.append('lastName', createLastNameRef.current.value)
        formData.append('description', createDescriptionRef.current.value)
        formData.append('position', createPositionRef.current.value)
        if(createPictureRef.current.files)
            formData.append('picture', createPictureRef.current.files[0])

        //make the request
        const response = await fetch(`${backendUrl}/staff/create-staff`, {
            method: "POST",
            body: formData
        })
        const result = await response.json()
        alert(result.message || result.error)

        //refresh the data
        const staff_ = await fetchStaff()
        setStaff(staff_)

        if(response.status === 200) {
            //clear input fields
            createFirstNameRef.current.value = ""
            createLastNameRef.current.value = ""
            createPositionRef.current.value = ""
            createPictureRef.current.value = ""
            createDescriptionRef.current.value = ""
        }
    } catch (error) {
        alert("Error: Couldn't create staff member")
        console.error("Error creating staff member:", error)
    }
  }

  //update staff member
  const [updateModalOn, setUpdateModalOn] = useState(false)
  const [updateId, setUpdateId] = useState()
  const [UMContent, setUMContent] = useState()
  useEffect(() => {
    if(UMContent){
        updateIdRef.current.value = UMContent._id
        updateFirstNameRef.current.value = UMContent.firstName
        updateLastNameRef.current.value = UMContent.lastName
        updatePositionRef.current.value = UMContent.position
        if(UMContent.picture) {
            updatePictureHolder.current.style.display = 'block'
            updatePictureElRef.current.src = `${backendUrl}/uploads/${UMContent.picture}`
        }
        else {
            updatePictureHolder.current.style.display = 'none'
            updatePictureElRef.current.src = ""
        }
        updateDescriptionRef.current.value = UMContent.description
    }
  }, [UMContent])
  const updateIdRef = useRef()
  const updateFirstNameRef = useRef()
  const updateLastNameRef = useRef()
  const updatePositionRef = useRef()
  const updatePictureHolder = useRef()
  const updatePictureRef = useRef()
  const updatePictureElRef = useRef()
  const updateDescriptionRef = useRef()
  async function updateMember() {
    try{
        //create request body
        const formData = new FormData()
        formData.append('firstName', updateFirstNameRef.current.value)
        formData.append('lastName', updateLastNameRef.current.value)
        formData.append('description', updateDescriptionRef.current.value)
        formData.append('position', updatePositionRef.current.value)
        if(updatePictureRef.current.files)
            formData.append('picture', updatePictureRef.current.files[0])

        //make request
        const response = await fetch (`${backendUrl}/staff/update-member/${updateIdRef.current.value}`, {
            method: "PUT",
            body: formData
        })
        const result = await response.json()
        alert(result.message || result.error)

        //refresh the data
        const staff_ = await fetchStaff()
        setStaff(staff_)

        //clear picture data
        if(response.status === 200)
            updatePictureRef.current.value = ''
    } catch (error) {
        alert("Error: Couldn't update staff member")
        console.error("Error updating staff member:", error)
    }
  }

  //delete staff member picture
  async function deleteMemberPicture() {
    try{
        //make request
        const response = await fetch(`${backendUrl}/staff/delete-member-picture/${updateIdRef.current.value}`, {
            method: 'DELETE'
        })
        const result = await response.json()
        alert(result.message || result.error)

        //refresh data
        const staff_ = await fetchStaff()
        setStaff(staff_)
    } catch (error) {
        alert("Error: Couldn't delete staff member")
        console.error("Error deleting staff member:", error)
    }
  }

  //delete single staff member
  const [delModalOn, setDelModalOn] = useState(false)
  const [delId, setDelId] = useState("")
  async function deleteMember() {
    try{
        //make request
        const response = await fetch (`${backendUrl}/staff/delete-member/${delId}`, {
            method: "DELETE"
        })
        const result = await response.json()
        alert(result.message || result.error)

        //refresh data
        const staff_ = await fetchStaff()
        setStaff(staff_)

        //close modal
        if(response.status === 200)
            setDelModalOn(false)
    } catch (error) {
        alert("Error: Couldn't delete staff member")
        console.error("Error deleting staff member:", error)
    }
  }

  //delete entire staff
  const [delAllModalOn, setDelAllModalOn] = useState(false)
  async function deleteEntireStaff() {
    try{
        //make request
        const response = await fetch (`${backendUrl}/staff/delete-staff`, {
            method: "DELETE"
        })
        const result = await response.json()
        alert(result.message || result.error)

        //refresh data
        const staff_ = await fetchStaff()
        setStaff(staff_)

        //close modal
        if(response.status === 200)
            setDelAllModalOn(false)
    } catch (error) {
        alert("Error: Couldn't delete entire staff")
        console.error("Error deleting entire staff:", error)
    }
  }

  useEffect(() => {
    async function setTheStaff() {
        const staff_ = await fetchStaff()
        setStaff(staff_)
    }
    setTheStaff()
  }, [])
  
  return (
    <>
        {/*create modal*/} 
        <FormModalWrapper id='create_modal' title='Create Project' modalVar={createModalOn} closeModal={() => {setCreateModalOn(false)}}>
            <form action="">
                <div className="input_holder">
                    <input ref={createFirstNameRef} type="text" name="" id="" placeholder='First name' />
                    <input ref={createLastNameRef} type="text" name="" id="" placeholder='Last name' />
                </div>
                <div className="input_holder">
                    <input ref={createPositionRef} type="text" name="" id="" placeholder='Position'/>
                    <input ref={createPictureRef} type="file" name="" id="" />
                </div>
                <textarea ref={createDescriptionRef} name="" id="" cols="30" rows="10" placeholder='Description'></textarea>
                <button className='cta form_submit' type="button" onClick={() => {createMember()}}><p>Create</p></button>
            </form>
        </FormModalWrapper>
        
        {/*update modal*/} 
        <FormModalWrapper id='update_modal' title='Create Project' modalVar={updateModalOn} closeModal={() => {setUpdateModalOn(false)}}>
            <form action="">
                <input ref={updateIdRef} type="text" style={{ display: "none" }} />
                <div className="input_holder">
                    <input ref={updateFirstNameRef} type="text" name="" id="" placeholder='First name' />
                    <input ref={updateLastNameRef} type="text" name="" id="" placeholder='Last name' />
                </div>
                <div className="input_holder">
                    <input ref={updatePositionRef} type="text" name="" id="" placeholder='Position'/>
                    <input ref={updatePictureRef} type="file" name="" id="" />
                </div>
                <div ref={updatePictureHolder} className="modal_picture" style={{ width: '300px', maxWidth: '100%', marginBottom: '10px'}}>
                    <img ref={updatePictureElRef} src="" alt="" style={{ width: '100%' }} />
                    <button type='button' className="picture_del"><FontAwesomeIcon icon={faTrash} onClick={() => { deleteMemberPicture() }} /></button>
                </div>
                <textarea ref={updateDescriptionRef} name="" id="" cols="30" rows="10" placeholder='Description'></textarea>
                <button className='cta form_submit' type="button" onClick={() => {updateMember()}}><p>Update</p></button>
            </form>
        </FormModalWrapper>
        
        {/*delete single modal*/} 
        <ConfirmModalWrapper 
            title='Delete Staff Member?' 
            closeModal={() => {setDelModalOn(false)}} 
            modalOn={delModalOn} 
            message='Are you sure you want to delete this staff member? It cannot be recovered!'
            confirmFunction = {() => {deleteMember()}}
        />
        
        {/*delete all modal*/} 
        <ConfirmModalWrapper 
            title='Delete Entire Staff?' 
            closeModal={() => {setDelAllModalOn(false)}} 
            modalOn={delAllModalOn} 
            message='Are you sure you want to delete the entire staff? They cannot be recovered!'
            confirmFunction = {() => {deleteEntireStaff()}}
        />

        
        <section id="admin_header" className='three_quarter_topped half_bottomed fixed_lefted righted'>
            <AdminHeader title='Staff' noFilter={true} noCreate={false} noDel={false} openCreate={() => { setCreateModalOn(true) }} openDel={() => { setDelAllModalOn(true) }} openFilter={() => { setFiltersOn(!filtersOn) }} />
        </section>

        <section id="content" className="fixed_lefted righted bottomed">
            <p><span ref={contentNumber} className='numb_disp'></span> Elements displayed</p>
            <table id="content_table">
                <thead>
                    <tr id="ct_head">
                        <th><p>Name</p></th>
                        <th><p>Email</p></th>
                        <th className='action_head'><p>Actions</p></th>
                    </tr>
                </thead>
                {staff? 
                    <tbody>
                        {staff.map(member => (
                            <tr key={member._id}>
                                <td data-label="Name"><p>{member.firstName + " " + member.lastName}</p></td>
                                <td data-label="Position"><p>{member.position}</p></td>
                                <td data-label="Actions" className='action_cell'>
                                    <button className="edit_btn cta" onClick={() => { setUpdateModalOn(true); setUpdateId(member._id); setUMContent(member) }}><FontAwesomeIcon icon={faPencil}/></button>
                                    <button className="del_btn cta red"><FontAwesomeIcon icon={faTrash} onClick={() => { setDelModalOn(true); setDelId(member._id) }}/></button>
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

export default adminStaff