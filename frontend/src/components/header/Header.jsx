import React from 'react'
import { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import { Logo,Button,LogoutBtn} from '../index.js'
import { useSelector } from 'react-redux'


function Header() {

  const authStatus=useSelector((state)=>state.authStatus)

  const navigate=useNavigate()
  const navItems=[
    // {
    // name:"categories",
    // topath:"",
    // isactive:!authStatus
    // },
    {
      name:"login",
      topath:"/login",
      isactive:!authStatus
    },
    {
      name:"signup",
      topath:"/signup",
      isactive:!authStatus
    },
    {
      name:"cart",
      topath:"/cart",
      isactive:authStatus
    },
  ]
  
  return (
    <>
    <div className='bg-gray-300 flex flex-wrap p-1'>
    <nav className='flex flex-wrap'>
      <ul className='flex flex-wrap p-2 '>
        {
        navItems
        .filter(item => item.isactive)
        .map((item)=>{
          return <li key={item.name} value={item.name} className='m-1'>
            <Button  onClick={()=>{
              navigate(item.topath)
            }}>
              {item.name}
            </Button>
          </li>
        })
      }
      </ul> 
      <div className='absolute mt-2.5 right-5 rounded'>
        {
          authStatus?(<LogoutBtn/>):null
        }
      </div>
    </nav>
    </div>
    </>
  )
}

export default Header