import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Link } from "react-router";

interface ArtistCardProps {
  id: number;
  name: string;
}

export function ArtistCard({ id, name }: ArtistCardProps) {
  return (
    <Card>
      <CardActionArea component={Link} to={`/artists/${id}`}>
        <CardContent>
          <Typography variant="h6" component="div" align="center">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
