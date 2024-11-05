import './App.css'
import { Button } from "./components/ui/button"
import SongSearch from './components/songSearch'
import { useContext, useEffect } from 'react'
import {AppContext} from './state/state'
import AuthenticateButton from './components/authenticateButton'


function App() {

  const appContext = useContext(AppContext)

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const authCode = params.get('access_token');
    if (authCode) {
      console.log(authCode)
      appContext.setSpotifyUserAuthCode(authCode);
    }
  }, [])

  // temp call to cloud function to get access token
  useEffect(() => {
    fetch('https://spotifyauth-zwxcnyjcja-uc.a.run.app', {
      method: 'GET',
      headers: {
        // 'Access-Control-Allow-Origin': 'testing',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Referrer-Policy': 'origin',
        'Access-Control-Allow-Origin': '*',
        'accept': '*/*',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
      },
      mode: 'cors',
    })
      .then(res => res.json())
      .then(data => {
        if (data.body){
          appContext.setSpotifyToken(data.body.access_token)
        }
      })
      
  }, [])
  return (
    <>
      <div className="flex items-center">
      <SongSearch />
      <Button className="self-start ml-2">Click me</Button>
      </div>
      <AuthenticateButton />
    </>
  )
}

export default App
