import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { useState } from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useUserContext } from '../context/state';
import { app } from '../utils/firebaseInit';


const auth = getAuth(app);

export default function Login() {
    const { userInfo } = useUserContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);

    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential: UserCredential) => {
                // Signed in 
                userInfo.setUser(userCredential.user);
                setOpen(false);
            })
            .catch((error: { code: string; message: string }) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error signing in:", errorCode);
                if (errorCode === 'auth/weak-password') {
                    setError('You already have an account, please login');
                } else {
                    setError(errorMessage.replace('Firebase: ', ''));
                }
            })
    }


    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential: UserCredential) => {
                // Signed in 
                userInfo.setUser(userCredential.user);
                setOpen(false);

            })
            .catch((error: { code: string; message: string }) => {
                setError(error.message);
            })
    };

    return (
        <div className="absolute top-5 right-5">
            <Button
                onClick={() => setOpen(true)}
                variant="ghost"
            >Login and Save Memories</Button>
            <Dialog
                open={open}
                onOpenChange={setOpen}
            >
                <DialogContent className="p-6 space-y-4">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Please Login</DialogTitle>
                        <DialogDescription>
                            You need to login to save your memories and access them later
                        </DialogDescription>
                    </DialogHeader>
                    <DialogDescription className="space-y-4">
                        <Input
                            className="w-full p-2 border rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <Input
                            className="w-full p-2 border rounded"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <div className="flex justify-between">
                            <Button className="w-full mr-2" onClick={handleSignup}>Signup</Button>
                            <Button className="w-full ml-2" onClick={handleSignIn}>Login</Button>
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </div>
    )
}
