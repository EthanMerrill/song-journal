import { useState, createContext, ReactNode, useContext } from 'react';
import { songEntry } from '../types/models';
import app from '../utils/firebaseInit';
import { getAuth, createUserWithEmailAndPassword, User } from 'firebase/auth';

interface UserContextType {
    spotifyToken: string | null;
    setSpotifyToken: (token: string | null) => void;
    spotifyUserAuthCode: string | null;
    setSpotifyUserAuthCode: (code: string | null) => void;
    searchedSongId: string | null;
    setSearchedSongId: (id: string | null) => void;
    songEntries: songEntry[] | null;
    setSongEntries: (entries: songEntry[] | null) => void;
    userInfo: {
        createUser: (email: string, password: string) => void;
        user: User | null;
        loading: boolean;
    };
}

const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [spotifyToken, setSpotifyToken] = useState<string | null>(null);
    const [spotifyUserAuthCode, setSpotifyUserAuthCode] = useState<string | null>(null);
    const [searchedSongId, setSearchedSongId] = useState<string | null>(null);
    const [songEntries, setSongEntries] = useState<songEntry[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const auth = getAuth(app);

    const createUser = (email: string, password: string) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const userInfo = {
        createUser,
        user: null,
        loading,
    };

    return (
        <UserContext.Provider value={{
            songEntries,
            setSongEntries,
            spotifyToken,
            setSpotifyToken,
            spotifyUserAuthCode,
            setSpotifyUserAuthCode,
            searchedSongId,
            setSearchedSongId,
            userInfo,
        }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserContextProvider };

// Custom hook to use the UserContext
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
};
