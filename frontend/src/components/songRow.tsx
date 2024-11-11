import React, { useState } from 'react';
import { CalendarPopover } from "./calendarPopover";
import SongSearch from "./songSearch";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { songDetails } from "../types/models";
import { useUserContext } from '../context/state';
import { useToast } from "@/hooks/use-toast"

export function NewSongCard() {
  const { setSongEntries, songEntries } = useUserContext();
  const { toast } = useToast()

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [searchedSong, setSearchedSong] = useState<songDetails | null>(null);
  const [journalEntry, setJournalEntry] = useState<string>('');
  const [reset, setReset] = useState(false);


  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSongSearchChange = (song: songDetails | null) => {
    setSearchedSong(song);
  };

  const handleJournalEntryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJournalEntry(e.target.value);
  };

  const handleSave = () => {
    // Handle save logic here
    if (!selectedDate || !searchedSong) {
      console.error('Missing required fields');
      return;
    }
    if (songEntries === null) {
      setSongEntries([{
        date: selectedDate,
        song: searchedSong,
        journalEntry: journalEntry
      }]);
      return;
    }
    setSongEntries(songEntries.concat({
      date: selectedDate,
      song: searchedSong,
      journalEntry: journalEntry
    }));
    setSelectedDate(null);
    setSearchedSong(null);
    setJournalEntry('');
  };

  const handleReset = () => {
    setReset(true);
  };

  const handleResetComplete = () => {
    setReset(false);
  };


  return (
    <Card className="w-96 right-24 top-24 absolute">
      <CardHeader>
        <CardTitle>Memory Playlist</CardTitle>
        {/* filler text descriptive of what a memory playlist is, ending with a call to action */}
        <CardDescription>
          A memory playlist is a collection of songs that remind you of a specific time or place. Create a new entry to add a song to your memory playlist.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <CalendarPopover onDateChange={handleDateChange} resetDate={reset} onResetComplete={handleResetComplete} />
        <SongSearch onSongSearchChange={handleSongSearchChange} reset={reset} onResetComplete={handleResetComplete} />
        <Textarea
          placeholder="Type your entry here"
          value={journalEntry}
          onChange={handleJournalEntryChange}
        />
        <Button variant="default" onClick={() => {

          // only save and toast if all fields are filled out
          if (!selectedDate || !searchedSong || !journalEntry) {
            toast({
              title: "Missing Required Fields",
              description: "Please fill out all fields before saving."

            })
            return;
          }
          handleSave();
          handleReset();
          toast({
            title: "Saved Entry!",
            description: "Your song journal entry has been saved.",
          })
        }}>Save</Button>
      </CardContent>
    </Card >
  );
}