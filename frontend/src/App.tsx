import './App.css'

import SongSearch from './components/songSearch'
import { useContext, useEffect } from 'react'
import {UserContextProvider, useUserContext} from './context/state'
import AuthenticateButton from './components/authenticateButton'


function App() {

  return (
    <UserContextProvider>
      <div className="flex items-center">
      <SongSearch />
      
      </div>
      <AuthenticateButton />
    </UserContextProvider>
  )
}

export default App
