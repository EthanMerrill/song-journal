"use client"
import { useState, createContext, ReactNode, useContext } from 'react';

export const AppContext = createContext(null as any);
interface AppContextProviderProps {
    children: ReactNode;
}

export default function AppContextProvider({ children }: AppContextProviderProps) {
    const [spotifyToken, setSpotifyToken] = useState<string|null>(null);
    const [spotifyUserAuthCode, setSpotifyUserAuthCode] = useState<string|null>(null);
    const [searchedSongId, setSearchedSongId] = useState<string|null>(null);

    return (
        <AppContext.Provider value={
            { 
            spotifyToken, setSpotifyToken, 
            spotifyUserAuthCode, setSpotifyUserAuthCode, 
            searchedSongId, setSearchedSongId
            }
        }>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}