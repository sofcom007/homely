import React from 'react'
import { useEffect } from 'react'
//import components
import AdminHeader from '../components/adminHeaderTop'

const adminDashboard = () => {
  useEffect(() => {
    document.title = "Admin Dashboard | Homely"
  }, [])

  return (
    <> 
      <section className="double_topped bottomed fixed_lefted righted">
        <h1>Hello, User</h1>
      </section>

      <div id="page_content">

      </div>
    </>
  )
}

export default adminDashboard