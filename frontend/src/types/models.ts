export interface songEntry {
  song: songDetails;
  date: Date;
  journalEntry: string;
}

export interface songDetails {
  songName: string;
  artistName: string;
  albumName: string;
  songId: string;
  songUrl: string;
  imageUrl: string;
}
