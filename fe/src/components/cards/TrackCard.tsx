import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Link } from "react-router";

interface TrackCardProps {
  id: number;
  title: string;
  releaseTitle?: string;
  artistName?: string;
}

export function TrackCard({
  id,
  title,
  releaseTitle,
  artistName,
}: TrackCardProps) {
  return (
    <Card>
      <CardActionArea component={Link} to={`/tracks/${id}`}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          {releaseTitle && (
            <Typography variant="body2" color="text.secondary">
              from {releaseTitle}
            </Typography>
          )}
          {artistName && (
            <Typography
              variant="caption"
              color="primary"
              sx={{ display: "block" }}
            >
              by {artistName}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
