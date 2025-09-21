import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'

import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'


const router=createBrowserRouter([
  {path:"/",element:<App/>,children:[
    {path:"/cart",element:<Cart/>},
    {path:"/login",element:<Login/>}
  ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
    
)
