import React from 'react'
import { useState } from 'react'
//import components
import AdminHeader from '../components/adminHeaderTop'
import FormModalWrapper from '../components/formModalWrapper'
import ConfirmModalWrapper from '../components/confirmModalWrapper'

const adminStaff = () => {
    const [filtersOn, setFiltersOn] = useState(false);
    const [createModalOn, setCreateModalOn] = useState(false);
    const [delAllModalOn, setDelAllModalOn] = useState(false);

  return (
    <>
        {/*create modal*/} 
        <FormModalWrapper id='create_modal' title='Create Project' modalVar={createModalOn} closeModal={() => {setCreateModalOn(false)}}>
            <form action="">
                <div className="input_holder">
                    <input type="text" name="" id="" placeholder='First name' required />
                    <input type="text" name="" id="" placeholder='Last name' required />
                </div>
                <div className="input_holder">
                    <input type="email" name="" id="" placeholder='Email' required />
                    <input type="tel" name="" id="" placeholder='Phone' />
                </div>
                <input type="file" name="" id="" />
                <textarea name="" id="" cols="30" rows="10" placeholder='Description' required></textarea>
                <button className='cta form_submit' type="submit"><p>Create</p></button>
            </form>
        </FormModalWrapper>
        
        {/*edit modal*/} 
        
        {/*delete modal*/} 
        <ConfirmModalWrapper title='Delete All?' closeModal={() => {setDelAllModalOn(false)}} modalOn={delAllModalOn} message='Are you sure you want to delete the entire staff? They cannot be recovered!' />

        
        <section id="admin_header" className='three_quarter_topped half_bottomed fixed_lefted righted'>
            <AdminHeader title='Staff' noFilter={true} noCreate={false} noDel={false} openCreate={() => { setCreateModalOn(true) }} openDel={() => { setDelAllModalOn(true) }} openFilter={() => { setFiltersOn(!filtersOn) }} />
        </section>

        <section id="content" className="fixed_lefted righted bottomed">
            <table id="content_table">
                <thead>
                    <th><p>Name</p></th>
                    <th><p>Email</p></th>
                </thead>
                <tbody></tbody>
            </table>
        </section>

        <div id="page_content"></div>
    </>
  )
}

export default adminStaff