import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider}  from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import Login from './login/login.tsx';
import Calendar from './Calendar/Calendar.tsx';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import Dashboard from './Dashboard/Dashboard.tsx';





 const router = createBrowserRouter([
    {
      path:"/",
      element:<App/>,
      children:[
        {
          path:"/schedule",
          element: <Calendar/>
        },
        {
          path:"/dashboard",
          element: <Dashboard/>
        }

      ]
      
    },
    {
      path:"/login",
      element:<Login/>
    }
 ])



createRoot(document.getElementById('root')!).render(

 

  <StrictMode>

      <MantineProvider >
        <RouterProvider router ={router}/>
      </MantineProvider>
    
  </StrictMode>,
)
