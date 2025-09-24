import { useState } from 'react'
import './App.css'
import {Header} from './components/index.js'


import Login from './pages/Login.jsx'

function App() {
  return (
    <div className='w--full h-full'>
      <Header/>
      <Login/>
    </div>
  )
}

export default App
