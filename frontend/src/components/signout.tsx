import { toast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { getAuth, signOut } from "firebase/auth";
import { useUserContext } from '../context/state';
import { app } from '../utils/firebaseInit';
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function Signout() {
    const { userInfo } = useUserContext();

    const auth = getAuth(app);
    const handleSignOut = () => {
        signOut(auth).then(() => {
            userInfo.setUser(null);
            toast({
                title: "Signed out",
                description: "You have been signed out",
            });
        }).catch((error) => {
            // An error happened.
            toast({
                title: "Error signing out",
                description: error.message,
            })
        });
    }


    return (
        <div className="absolute top-5 right-5 flex row gap-3 center">
            <Avatar>
                <AvatarFallback> {userInfo.user?.email?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <Button
                onClick={() => {
                    handleSignOut();
                }}
            >
                Sign out
            </Button>
        </div>
    );
}