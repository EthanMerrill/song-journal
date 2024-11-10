import './App.css'

import SongSearch from './components/songSearch'
import { AuthenticateDialog } from './components/authenticateDialog'
import {UserContextProvider} from './context/state'

function App() {

  return (
    <UserContextProvider>
      <div className="flex items-center">
      <SongSearch />
      </div>
      <AuthenticateDialog />
    </UserContextProvider>
  )
}

export default App
