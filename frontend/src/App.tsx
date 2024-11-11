import './App.css'
import { NewSongCard } from './components/songRow'
import { AuthenticateDialog } from './components/authenticateDialog'
import { UserContextProvider } from './context/state'
import { Timeline } from './components/timeline'
import { Toaster } from "@/components/ui/toaster"


function App() {

  return (
    <UserContextProvider>
      <div>
        <NewSongCard />
      </div>
      <AuthenticateDialog />
      <Timeline />
      <Toaster />
    </UserContextProvider>
  )
}

export default App
