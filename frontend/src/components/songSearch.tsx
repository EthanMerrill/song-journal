
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    } from "./ui/command"
import { useContext, useState } from "react"
import { AppContext } from "../state/state"

export default function SongSearch() {
  const appContext = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState<string[]>([]);

  const handleSearch = async () => {
    if (!appContext.spotifyToken) {
      return;
    }
    const response = await fetch('https://api.spotify.com/v1/search?q=' + encodeURIComponent("query") + '&type=track&limit=5', {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + appContext.spotifyToken
        }
    });
    const data = await response.json();
    setSongs(data.results);
  };

  return (
    <div>
        <Command className="flex-1 w-72">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
        {songs.map((song:string) => (
          <CommandItem>{song}</CommandItem>
        ))}
        </CommandGroup>
        <CommandSeparator />
        </CommandList>
      </Command>
      <ul>
        
      </ul>
    </div>
  );
}