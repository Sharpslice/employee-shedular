
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './Header/Header'
import { useEffect } from 'react'
import {io} from 'socket.io-client'
function App() {
  
  useEffect(()=>{
    const socket = io("http://localhost:3000");
    socket.on("connect",()=>{
      console.log("Connected to backend:", socket.id);
    })

    return()=>{
      socket.disconnect();
    }
  },[])


  return (
    <>
      <Header/>
    
      <Outlet/>
    </>
  )
}

export default App
