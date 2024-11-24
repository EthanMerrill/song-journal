import './App.css'
import { NewSongCard } from './components/songRow'
import { AuthenticateDialog } from './components/authenticateDialog'
import { UserContextProvider } from './context/state'
import { Timeline } from './components/timeline'
import { Toaster } from "@/components/ui/toaster"
import SignInOutButton from './components/signInOutButton'

function App() {

  return (
    <UserContextProvider>
      <SignInOutButton />
      <div className="App">
        <NewSongCard />
      </div>
      <AuthenticateDialog />
      <Timeline />
      <Toaster />
    </UserContextProvider >
  )
}

export default App
