import React, { useState, useEffect } from 'react';
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
import {Button} from "./ui/button";

const SongSearch = () => {
  const { spotifyToken } = useUserContext();
  const [inputValue, setInputValue] = useState('');
  const [songs, setSongs] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleSearch = async () => {
    if (!spotifyToken) {
      console.error('Spotify token is missing');
      return;
    }

    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(inputValue)}&type=track&limit=5`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${spotifyToken}`
      }
    });
    const data = await response.json();
    setSongs(data.tracks.items.map((item: any) => item.name)); // Adjust based on the actual response structure
    setOpen(true);
  };

  useEffect(() => {
    if (inputValue.length < 3) {
      setOpen(false);
      return;
    }

    const searchTimeout = setTimeout(() => {
      console.log("searching for", inputValue);
      handleSearch();
    }, 900); // 900ms debounce delay

    // Clear the timeout if the component unmounts or inputValue changes
    return () => {
      clearTimeout(searchTimeout);
    };
  }, [inputValue]);

  const handleValueChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <div>
      <Command className="flex-1 w-72">
        <CommandInput
          placeholder="Type a command or search..."
          value={inputValue}
          onValueChange={handleValueChange}
        />
        <CommandList>
          {open && (
            <>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                {songs && songs.map((song: string, index: number) => (
                  <CommandItem key={index}>{song}</CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}
        </CommandList>
      </Command>
      <Button className="self-start ml-2" onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SongSearch;