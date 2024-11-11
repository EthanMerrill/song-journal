import { useUserContext } from '../context/state';
import { useEffect, useState } from 'react';
import { TimelineCard } from './timelineCard';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Timeline() {
  const { songEntries } = useUserContext();

  const [dateRange, setDateRange] = useState<{ min: number, max: number }>({ min: 0, max: 100 });
  // Calculate the min and max dates

  useEffect(() => {
    if (songEntries && songEntries.length > 1) {
      const minDate = Math.min(...songEntries.map(entry => new Date(entry.date).getTime()));
      const maxDate = Math.max(...songEntries.map(entry => new Date(entry.date).getTime()));
      setDateRange({ min: minDate, max: maxDate });
      // Calculate the relative position of each date
    } else {
      setDateRange({ min: 0, max: 100 });
    }
  }, [songEntries]);


  const relativePosition = (date: Date) => {
    const dateMillis = new Date(date).getTime();
    // const fullPosition = ((dateMillis - dateRange.min) / (dateRange.max - dateRange.min))
    // const ninteyPercentPosition = (fullPosition / 90) * 100
    return ((dateMillis - dateRange.min) / (dateRange.max - dateRange.min)) * 90;
  };


  return (
    <div className="timeline absolute h-[90%] w-px bg-gray-300 top-[5%] left-36">
      {songEntries && songEntries.map((entry, index) => (
        <div
          key={index}
          style={{ top: `${songEntries.length > 1 ? relativePosition(entry.date) : 50}%` }}
          className="flex flex-row min-w-80 items-center gap-4 absolute -left-28"
        >
          <p className="text-xs text-muted-foreground">
            {new Date(entry.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</p>
          <Avatar
            className='h-16 w-16'
          >
            <AvatarImage src={entry.song.imageUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <TimelineCard
            date={entry.date}
            journalEntry={entry.journalEntry}
            albumArt={entry.song.imageUrl}
            songName={entry.song.songName}
          />
        </div>
      ))}
    </div>
  );
};

export default Timeline;