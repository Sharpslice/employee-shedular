
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './Header/Header'
import AuthProvider from './AuthenticatedUserContext'

import {useQuery,QueryClient,QueryClientProvider} from '@tanstack/react-query'



function App() {

  const queryClient = new QueryClient();

  return (
    <>
    <QueryClientProvider client={queryClient}>
       <AuthProvider>
        <Header/>
      
        <Outlet/>
      </AuthProvider>
    </QueryClientProvider>
     

      
    </>
  )
}

export default App
