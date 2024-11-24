import { useUserContext } from '../context/state';
import Login from './login'
import Signout from './signout';
import { useEffect } from 'react';


export default function SignInOutButton() {
    const { userInfo } = useUserContext();

    // reload the component when the user logs in or out
    useEffect(() => {
        // This effect will run whenever userInfo changes
        console.log("User info changed", userInfo);
    }, [userInfo.user]);

    return (
        <div className="absolute top-5 right-5">
            {userInfo?.user?.email ?
                <Signout />
                : <Login />}
        </div>
    );
}
