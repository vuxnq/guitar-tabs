import { Card, CardContent, Typography, List, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material";
import { Link } from "react-router";
import type { Track } from "../../types";

interface DiscographyCardProps {
  id: number;
  title: string;
  tracks: Track[];
  isHighlighted: boolean;
}

export function DiscographyCard({ id, title, tracks, isHighlighted }: DiscographyCardProps) {
  return (
    <Card 
      id={`release-${id}`}
      sx={{
        bgcolor: isHighlighted ? 'action.selected' : '',
        transition: 'background-color .5s ease-in-out',
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </CardContent>

      <Divider />

      <List disablePadding>
        {tracks.map((track) => (
          <ListItem key={track.id} disablePadding>
            <ListItemButton component={Link} to={`/tracks/${track.id}`}>
              <ListItemText primary={track.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
