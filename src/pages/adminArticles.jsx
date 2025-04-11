import React from 'react'
import { useState } from 'react'
//import components
import AdminHeader from '../components/adminHeaderTop'
import FormModalWrapper from '../components/formModalWrapper'
import ConfirmModalWrapper from '../components/confirmModalWrapper'

const adminArticles = () => {
    const [filtersOn, setFiltersOn] = useState(false);
    const [createModalOn, setCreateModalOn] = useState(false);
    const [delAllModalOn, setDelAllModalOn] = useState(false);

  return (
    <>
        {/*create modal*/} 
        <FormModalWrapper id='create_modal' title='Create Project' modalVar={createModalOn} closeModal={() => {setCreateModalOn(false)}}>
            <form action="">
                <input type="text" name="" id="" placeholder='Article title' required />
                <input type="file" name="" id="" placeholder='Cover' required />
                <textarea name="" id="" cols="30" rows="10" placeholder='Content' required></textarea>
                <button className='cta form_submit' type="submit"><p>Create</p></button>
            </form>
        </FormModalWrapper>
        
        {/*edit modal*/} 
        
        {/*delete modal*/} 
        <ConfirmModalWrapper title='Delete All?' closeModal={() => {setDelAllModalOn(false)}} modalOn={delAllModalOn} message='Are you sure you want to delete all the articles? They cannot be recovered!' />

        
        <section id="admin_header" className='three_quarter_topped half_bottomed fixed_lefted righted'>
            <AdminHeader title='Articles' noFilter={true} noCreate={false} noDel={false} openCreate={() => { setCreateModalOn(true) }} openDel={() => { setDelAllModalOn(true) }} openFilter={() => { setFiltersOn(!filtersOn) }} />
        </section>

        <section id="content" className="fixed_lefted righted bottomed">
            <table id="content_table">
                <thead>
                    <th><p>Date</p></th>
                    <th><p>Title</p></th>
                    <th><p>Actions</p></th>
                </thead>
                <tbody></tbody>
            </table>
        </section>

        <div id="page_content"></div>
    </>
  )
}

export default adminArticles