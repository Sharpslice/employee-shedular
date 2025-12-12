
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './Header/Header'
import AuthProvider from './AuthenticatedUserContext'

function App() {
  
 


  return (
    <>
    <AuthProvider>
      <Header/>
    
      <Outlet/>
    </AuthProvider>

      
    </>
  )
}

export default App
