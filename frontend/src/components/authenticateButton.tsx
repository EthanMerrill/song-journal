import {useRandomString} from '../utils/utils'

const AuthenticateButton = () => {
    
    
    const state = useRandomString(16);
    const client_id = import.meta.env.VITE_SPOTIFY_CLIENT as string;
    const redirect_uri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI as string;
    // const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_SECRET as string;
    const scope = encodeURIComponent('user-read-currently-playing user-read-recently-played')


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