import { useState, createContext, ReactNode, useContext } from 'react';

interface UserContextType {
    spotifyToken: string | null;
    setSpotifyToken: (token: string | null) => void;
    spotifyUserAuthCode: string | null;
    setSpotifyUserAuthCode: (code: string | null) => void;
    searchedSongId: string | null;
    setSearchedSongId: (id: string | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [spotifyToken, setSpotifyToken] = useState<string | null>(null);
    const [spotifyUserAuthCode, setSpotifyUserAuthCode] = useState<string | null>(null);
    const [searchedSongId, setSearchedSongId] = useState<string | null>(null);

    return (
        <UserContext.Provider value={{ 
            spotifyToken, 
            setSpotifyToken, 
            spotifyUserAuthCode, 
            setSpotifyUserAuthCode, 
            searchedSongId, 
            setSearchedSongId 
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
