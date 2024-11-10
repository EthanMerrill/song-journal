import {useRandomString} from '../utils/utils'
import { useEffect } from 'react'
import { useUserContext} from '../context/state'


const AuthenticateButton = () => {
    
  const { setSpotifyToken, setSpotifyUserAuthCode } = useUserContext();
  const state = useRandomString(16);
  const client_id = import.meta.env.VITE_SPOTIFY_CLIENT as string;
  const redirect_uri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI as string;
  // const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_SECRET as string;
  const scope = encodeURIComponent('user-read-currently-playing user-read-recently-played')

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const authCode = params.get('access_token');
    if (authCode) {
      setSpotifyUserAuthCode(authCode);
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
          setSpotifyToken(data.body.access_token)
        }
      })
      
  }, [])

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + client_id;
    url += '&scope=' + scope;
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);


    return (
        <div className="flex align-baseline align-items-baseline  rounded-lg border-2 border-slate-600 px-4 py-1 h-8 text-sm w-[200px] mx-auto">
        <p className="text-slate-600 font-medium h-5 w-fit whitespace-nowrap ">
            <a href={url}>
                Authenticate with Spotify
            </a>
        </p>
    </div>
    )
    
}

export default AuthenticateButton;