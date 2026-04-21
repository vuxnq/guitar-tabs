import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Link } from "react-router";

interface ReleaseCardProps {
  id: number;
  artistId: number;
  title: string;
  artistName?: string;
}

export function ReleaseCard({
  id,
  artistId,
  title,
  artistName,
}: ReleaseCardProps) {
  return (
    <Card>
      <CardActionArea
        component={Link}
        to={`/artists/${artistId}#release-${id}`}
      >
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          {artistName && (
            <Typography variant="body2" color="primary">
              by {artistName}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
