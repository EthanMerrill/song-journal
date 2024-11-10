
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    } from "./ui/command"
import { useState } from "react"
import { useUserContext } from "../context/state"
import { Button } from "./ui/button"

export default function SongSearch() {
  const {spotifyToken} = useUserContext();

  // const [search, setSearch] = useState("");
  const [songs, setSongs] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false);

  const handleValueChange = (value: string) => {
    setInputValue(value);
    setOpen(!!value);
  };

  const handleSearch = async () => {
    if (!spotifyToken) {
      return;
    }
    const response = await fetch('https://api.spotify.com/v1/search?q=' + encodeURIComponent(inputValue) + '&type=track&limit=5', {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + spotifyToken
      }
    });
    const data = await response.json();
    setSongs(data.results);
  };

  return (
    <div>
        <Command className="flex-1 w-72">
        <CommandInput placeholder="Type a command or search..." 
        value={inputValue}
        onValueChange = {handleValueChange}/>
        <CommandList>
          {open &&
          <>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
        {songs.map((song: string, index: number) => (
              <CommandItem key={index}>{song}</CommandItem>
            ))}
        </CommandGroup>
        <CommandSeparator />
        </>
          }
        </CommandList>
          
      </Command>
      <Button className="self-start ml-2" onClick={handleSearch}>Search</Button>
    </div>
  );
}