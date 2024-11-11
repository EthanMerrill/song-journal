import { useState, useEffect } from 'react';
import { useUserContext } from '../context/state';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "./ui/command";
import { songDetails } from "../types/models";

interface SongSearchProps {
  onSongSearchChange: (song: songDetails | null) => void;
}

const SongSearch = (songSearch: SongSearchProps) => {
  const { spotifyToken } = useUserContext();
  const [inputValue, setInputValue] = useState('');
  const [songs, setSongs] = useState<songDetails[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<songDetails | null>(null);

  const handleSearch = async () => {
    if (!spotifyToken) {
      console.error('Spotify token is missing');
      return;
    }
    if (!inputValue) {
      console.log("input value set")
      return;
    }

    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(inputValue)}&type=track&limit=5`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${spotifyToken}`
      }
    });
    const data = await response.json();
    setSongs(data.tracks.items.map((item: any) => ({
      songName: item.name,
      artistName: item.artists[0].name,
      albumName: item.album.name,
      spotifyUrl: item.external_urls.spotify,
      imageUrl: item.album.images[0].url
    })));
    setOpen(true);
  };

  useEffect(() => {
    if (inputValue.length < 3) {
      setOpen(false);
      return;
    }
    if (selectedSong?.songName != inputValue || !selectedSong) {

      const searchTimeout = setTimeout(() => {
        console.log("searching for", inputValue);
        handleSearch();
      }, 500); // debounce delay

      // Clear the timeout if the component unmounts or inputValue changes
      return () => {
        clearTimeout(searchTimeout);
      };
    }
  }, [inputValue]);

  const handleValueChange = (value: string) => {
    setInputValue(value);
  };

  const handleSelect = (song: songDetails) => {
    songSearch.onSongSearchChange(song);
    setInputValue(song.songName);
    setSelectedSong(song);
    setOpen(false);
  }

  return (
    <div className='w-full'>
      <Command >
        <CommandInput
          placeholder="Search for a song"
          value={inputValue}
          onValueChange={handleValueChange}
        />
        <CommandList>
          {open && (
            <div className="absolute backdrop-blur-md bg-white/30">
              <CommandEmpty className="">No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                {songs && songs.map((song: songDetails, index: number) => (
                  <CommandItem key={index}
                    onSelect={() => handleSelect(song)}>{song.songName + " | " + song.artistName}</CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </div>
          )}
        </CommandList>
      </Command>
    </div>

  );
};

export default SongSearch;