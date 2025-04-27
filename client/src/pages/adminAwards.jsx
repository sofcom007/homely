import React from 'react'
import { useState, useEffect, useRef } from 'react'
//import components
import AdminHeader from '../components/adminHeaderTop'
import FormModalWrapper from '../components/formModalWrapper'
import ConfirmModalWrapper from '../components/confirmModalWrapper'
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

const adminAwards = () => {
  const [filtersOn, setFiltersOn] = useState(false)

  //fetch awards
  const [awards, setAwards] = useState()
  useEffect(() => {
    if(awards){
        const awd = awards.find(award => award._id === updateId)
        setUMContent(awd)
    }
  }, [awards])
  async function fetchAwards(){
    try{
        const response = await fetch('http://localhost:8080/awards/read-awards', {
            method: "GET"
        })
        const result = await response.json()
        //console.log(result)
        if(result.message)
            return alert(result.message)
        return result
    } catch (error) {
        alert("Error: Couldn't read awards")
        console.error("Error reading awards: ", error)
    }
  }

  //create award
  const [createModalOn, setCreateModalOn] = useState(false)
  const createName = useRef()
  const createDate = useRef()
  const createPicture = useRef()
  const createDescription = useRef()
  async function createAward() {
    try{
        //create request body
        const formData = new FormData()
        formData.append('name', createName.current.value)
        formData.append('date', createDate.current.value)
        formData.append('description', createDescription.current.value)
        if(createPicture.current.files)
            formData.append('picture', createPicture.current.files[0])

        //make request
        const response = await fetch('http://localhost:8080/awards/create-award', {
            method: "POST",
            body: formData
        })
        const result = await response.json()
        alert(result.message || result.error)

        //refresh data
        const awds = await fetchAwards()
        setAwards(awds)

        if(response.status === 200){
            createName.current.value = ""
            createDate.current.value = ""
            createPicture.current.value = ""
            createDescription.current.value = ""
        }
    } catch (error) {
        alert("Error: Couldn't create award")
        console.error("Error creating award: ", error)
    }
  }

  //update award
  const [updateModalOn, setUpdateModalOn] = useState(false)
  const [updateId, setUpdateId] = useState()
  const [UMContent, setUMContent] = useState(false)
  useEffect(() => {
    if(UMContent){
        updateIdRef.current.value = UMContent._id
        updateName.current.value = UMContent.name
        updateDate.current.value = UMContent.date
        updateDescription.current.value = UMContent.description
        if(UMContent.picture)
            updatePictureEL.current.src = `http://localhost:8080/uploads/${UMContent.picture}`
        else
            updatePictureEL.current.src = ""
    }
  }, [UMContent])
  const updateIdRef = useRef()
  const updateName = useRef()
  const updateDate = useRef()
  const updatePicture = useRef()
  const updatePictureEL = useRef()
  const updateDescription = useRef()
  async function updateAward() {
    try{
        //create request body
        const formData = new FormData()
        formData.append('name', updateName.current.value)
        formData.append('date', updateDate.current.value)
        formData.append('description', updateDescription.current.value)
        if(updatePicture.current.files)
            formData.append('picture', updatePicture.current.files[0])

        //make request
        const response = await fetch(`http://localhost:8080/awards/update-award/${updateIdRef.current.value}`, {
            method: "PUT",
            body: formData
        })
        const result = await response.json()
        alert(result.message || result.error)

        if(response.status === 200)
            updatePicture.current.value = ''

        //refresh data
        const awds = await fetchAwards()
        setAwards(awds)
    } catch (error) {
        alert("Error: Couldn't update award")
        console.error("Error updating award: ", error)
    }
  }

  //delete single award
  const [delModalOn, setDelModalOn] = useState(false)
  const [delId, setDelId] = useState(false)
  async function deleteAward() {
    try{
        const response = await fetch(`http://localhost:8080/awards/delete-award/${delId}`, {
            method: "DELETE"
        })
        const result = await response.json()
        alert(result.message || result.error)

        if(response.status === 200)
            setDelModalOn(false)

        //refresh data
        const awds = await fetchAwards()
        setAwards(awds)
    } catch (error) {
        alert("Error: Couldn't delete award")
        console.error("Error deleting award: ", error)
    }
  }

  //delete all awards
  const [delAllModalOn, setDelAllModalOn] = useState(false)
  async function deleteAllAwards() {
    try{
        const response = await fetch('http://localhost:8080/awards/delete-all-awards', {
            method: "DELETE"
        })
        const result = await response.json()
        alert(result.message || result.error)

        if(response.status === 200)
            setDelAllModalOn(false)

        //refresh data
        const awds = await fetchAwards()
        setAwards(awds)
    } catch (error) {
        alert("Error: Couldn't delete award")
        console.error("Error deleting award: ", error)
    }
  }

  useEffect(() => {
    document.title = "Admin Awards | Homely"

    //get awards
    async function getAwards () {
        const awds = await fetchAwards()
        setAwards(awds)
    }
    getAwards()
  }, [])
  

  return (
    <>
        {/*create modal*/} 
        <FormModalWrapper id='create_modal' title='Create Project' modalVar={createModalOn} closeModal={() => {setCreateModalOn(false)}}>
            <form action="">
                <div className="input_holder">
                    <input ref={createName} type="text" name="" id="" placeholder='Award title' required />
                    <input ref={createDate} type="date" name="" id="" placeholder='Date' required />
                </div>
                <input ref={createPicture} type="file" name="" id="" required />
                <textarea ref={createDescription} name="" id="" cols="30" rows="10" placeholder='Description' required></textarea>
                <button className='cta form_submit' type="button" onClick={() => {createAward()}}><p>Create</p></button>
            </form>
        </FormModalWrapper>
        
        {/*update modal*/} 
        <FormModalWrapper id='update_modal' title='Create Project' modalVar={updateModalOn} closeModal={() => {setUpdateModalOn(false)}}>
            <form action="">
                <input ref={updateIdRef} type="text" name="" id="" style={{ display: 'none' }} />
                <div className="input_holder">
                    <input ref={updateName} type="text" name="" id="" placeholder='Award title' required />
                    <input ref={updateDate} type="date" name="" id="" placeholder='Date' required />
                </div>
                <input ref={updatePicture} type="file" name="" id="" required />
                <img ref={updatePictureEL} style={{ width: '300px', maxWidth: '100%', marginBottom: '10px'}} src="" alt="" />
                <textarea ref={updateDescription} name="" id="" cols="30" rows="10" placeholder='Description' required></textarea>
                <button className='cta form_submit' type="button" onClick={() => {updateAward()}}><p>Update</p></button>
            </form>
        </FormModalWrapper>
        
        {/*delete single modal*/} 
        <ConfirmModalWrapper 
            title='Delete All Projects?' 
            closeModal={() => {setDelAllModalOn(false)}} 
            modalOn={delAllModalOn}
            message='Are you sure you want to delete all the awards? They cannot be recovered!'
            confirmFunction = {() => {deleteAllAwards()}}
        />
        
        {/*delete all modal*/} 
        <ConfirmModalWrapper 
            title='Delete Project?' 
            closeModal={() => {setDelModalOn(false)}} 
            modalOn={delModalOn} 
            message='Are you sure you want to delete this award? It cannot be recovered!'
            confirmFunction = {() => {deleteAward()}}
        />

        
        <section id="admin_header" className='three_quarter_topped half_bottomed fixed_lefted righted'>
            <AdminHeader title='Awards' noFilter={true} noCreate={false} noDel={false} openCreate={() => { setCreateModalOn(true) }} openDel={() => { setDelAllModalOn(true) }} openFilter={() => { setFiltersOn(!filtersOn) }} />
        </section>

        <section id="content" className="fixed_lefted righted bottomed">
            <table id="content_table">
                <thead>
                    <tr id="ct_head">
                        <th><p>Date</p></th>
                        <th><p>Title</p></th>
                        <th className='action_head'><p>Actions</p></th>
                    </tr>
                </thead>
                {awards? 
                    <tbody>
                        {awards.map(award => (
                            <tr key={award._id}>
                                <td data-label="Date"><p>{new Date(award.date).toISOString().split("T")[0]}</p></td>
                                <td data-label="Name"><p>{award.name}</p></td>
                                <td data-label="Actions" className='action_cell'>
                                    <button className="edit_btn cta" onClick={() => { setUpdateModalOn(true); setUpdateId(award._id); setUMContent(award) }}><FontAwesomeIcon icon={faPencil}/></button>
                                    <button className="del_btn cta red"><FontAwesomeIcon icon={faTrash} onClick={() => { setDelModalOn(true); setDelId(award._id) }}/></button>
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

export default adminAwards