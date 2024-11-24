import AuthenticateButton from "./authenticateButton";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { useUserContext } from '../context/state';


export const AuthenticateDialog = () => {
    const { spotifyUserAuthCode } = useUserContext();
    return (
        <>
            {(
                <Dialog
                    open={spotifyUserAuthCode == null}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Please Authenticate</DialogTitle>
                            <DialogDescription>
                                You are not authenticated with Spotify. Please authenticate to continue.
                            </DialogDescription>
                        </DialogHeader>
                        <AuthenticateButton />
                    </DialogContent>
                </Dialog>
            )}</>
    )
}
