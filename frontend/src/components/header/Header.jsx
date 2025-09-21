import React from 'react'
import { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import { Logo,Button} from '../index.js'

function Header() {
  const [authStatus,setAuthStatus]=useState(true)
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
    // {
    //   name:"logout",
    //   topath:"/logout",
    //   isactive:authStatus
    // },
    {
      name:"cart",
      topath:"/cart",
      isactive:authStatus
    },
  ]
  return (
    <>
    <div className='bg-gray-300 flex flex-wrap p-1'>
      <h1>hi</h1>
      <h1>hfi</h1>
    <nav className='flex flex-wrap'>
      <ul className='flex flex-wrap p-2 '>
        {
        navItems.map((item)=>{
          if(item.isactive){
            return <li key={item.name} value={item.name} className='m-1'>
              <Button  onClick={()=>{
                navigate(item.topath)
              }}>
                {item.name}
              </Button>
            </li>
          }
        })
      }
      </ul> 
    </nav>
    </div>
    </>
  )
}

export default Header