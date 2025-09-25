import React from 'react'
import {Button} from './index.js'
import { useDispatch } from 'react-redux'
import { logout  as reducerLogout} from '../store/authSlice.js'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
    const dispatch=useDispatch()
    const navigate=useNavigate()


    const logoutHandler=()=>{
        dispatch(reducerLogout())
        console.log("Suggesfully logged out")
        navigate("/login")
    }
  return (
    <Button onClick={logoutHandler}>Logout</Button>
  )
}

export default LogoutBtn