import React from 'react'
import { useSelector } from 'react-redux'
import UnAuth from '../pages/UnAuth'

function AdminPermision({children}) {
    const user = useSelector(state => state.user)
  return (
    <>
       {
        user.role === "Admin" ? children: <UnAuth/>
       }
    </>
  )
}

export default AdminPermision