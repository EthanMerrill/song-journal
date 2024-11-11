import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";

interface TimelineCardProps {
    date: Date;
    journalEntry: string;
    albumArt: string;
    songName: string;
}


export function TimelineCard(props: TimelineCardProps) {
    const { date, journalEntry, songName } = props;
    return (
        <Card className="w-64 text-xs justify-items-start">
            <CardHeader className="justify-start">
                <CardTitle >{songName}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs">
                <CardDescription className="text-xs">
                    {journalEntry.length > 200 ? `${journalEntry.substring(0, 200)}...` : journalEntry}
                </CardDescription>
            </CardContent>
        </Card>
    )
}
