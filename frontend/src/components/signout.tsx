import { toast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { getAuth, signOut } from "firebase/auth";

export default function Signout() {

    const auth = getAuth();
    signOut(auth).then(() => {
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

    return (
        <div className="absolute top-5 right-5">
            <Button
                onClick={() => {
                    console.log("Sign out");
                }}
            >
                Sign out
            </Button>
        </div>
    );
}