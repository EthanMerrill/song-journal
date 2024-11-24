import { useUserContext } from '../context/state';
import Login from './login'
import Signout from './signout';


export default function SignInOutButton() {
    const { userInfo } = useUserContext();
    console.log(userInfo?.user?.email)

    return (
        <div className="absolute top-5 right-5">
            {userInfo?.user?.email ?
                <Signout />
                : <Login />}
        </div>
    );
}
