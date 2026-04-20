import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Link } from "react-router";

interface TabCardProps {
  id: number;
  trackId: number;
  trackTitle?: string;
  artistName?: string;
  author: string;
}

export function TabCard({ id, trackId, trackTitle, artistName, author }: TabCardProps) {
  return (
    <Card>
      <CardActionArea component={Link} to={`/tracks/${trackId}/tabs/${id}`}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {trackTitle || "unknown track"}
          </Typography>
          {artistName && (
            <Typography variant="body2" color="primary" gutterBottom>
              by {artistName}
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            transcribed by {author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
