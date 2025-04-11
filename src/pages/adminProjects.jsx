import React from 'react'
import { useState } from 'react'
//import components
import AdminHeader from '../components/adminHeaderTop'
import AdminFilters from '../components/adminFilters'
import FormModalWrapper from '../components/formModalWrapper'
import ConfirmModalWrapper from '../components/confirmModalWrapper'


const adminProjects = () => {
    const [filtersOn, setFiltersOn] = useState(false);
    const [createModalOn, setCreateModalOn] = useState(false);
    const [delAllModalOn, setDelAllModalOn] = useState(false);

  return (
    <>
        {/*create modal*/} 
        <FormModalWrapper id='create_modal' title='Create Project' modalVar={createModalOn} closeModal={() => {setCreateModalOn(false)}}>
            <form action="">
                <div className="input_holder">
                    <input type="text" name="" id="" placeholder='Project name' required />
                    <select name="" id="">
                        <option value=""><p>Ongoing</p></option>
                        <option value=""><p>Complete</p></option>
                    </select>
                </div>
                <div className="input_holder">
                    <input type="file" name="" id="" placeholder='Cover picture' required/>
                    <input type="file" name="" id="" placeholder='Pictures' multiple required/>
                </div>
                <textarea name="" id="" cols="30" rows="10" placeholder='Description' required></textarea>
                <button className='cta form_submit' type="submit"><p>Create</p></button>
            </form>
        </FormModalWrapper>
        
        {/*edit modal*/} 
        
        {/*delete modal*/} 
        <ConfirmModalWrapper title='Delete All?' closeModal={() => {setDelAllModalOn(false)}} modalOn={delAllModalOn} message='Are you sure you want to delete the entire project portfolio? They cannot be recovered!' />

        
        <section id="admin_header" className='three_quarter_topped half_bottomed fixed_lefted righted'>
            <AdminHeader title='Projects' noFilter={false} noCreate={false} noDel={false} openCreate={() => { setCreateModalOn(true) }} openDel={() => { setDelAllModalOn(true) }} openFilter={() => { setFiltersOn(!filtersOn) }} />
            <AdminFilters filtersOn={filtersOn}>
                <select name="" id="">
                    <option value="all"><p>All</p></option>
                    <option value="ongoing"><p>Ongoing</p></option>
                    <option value="complete"><p>Complete</p></option>
                </select>
            </AdminFilters>
        </section>

        <section id="content" className="fixed_lefted righted bottomed">
            <table id="content_table">
                <thead>
                    <th><p>Status</p></th>
                    <th><p>Name</p></th>
                    <th><p>Actions</p></th>
                </thead>
                <tbody></tbody>
            </table>
        </section>

        <div id="page_content"></div>
    </>
  )
}

export default adminProjects