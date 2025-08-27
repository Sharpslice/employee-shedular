import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, Navigate, RouterProvider}  from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import Login from './login/login.tsx';
import Calendar from './Calendar/Calendar.tsx';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import Dashboard from './Dashboard/Dashboard.tsx';
import Week from './Dashboard/views/Week.tsx';
import DayView from './Dashboard/views/DayView.tsx';





 const router = createBrowserRouter([
    {
      path:"/",
      element:<App/>,
      children:[
        {
          path:"schedule",
          element: <Dashboard/>,
          children:[
            {
              index:true,
              element: <Navigate to={'week'} replace/>,
            },
            { path:'day',
              element: <DayView/>
            },
            { path:'week',
              element: <Week/>
            },
            {
              path:'month',
              element: null
            }
          ]
        },
        {
          path:'contacts',
          element: null
        },
        {
          path:"availability",
          element: null
        },
        {
          path:'calendar',
          element: <Calendar/>
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
