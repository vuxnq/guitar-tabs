import { useMatches, Link as RouterLink } from "react-router";
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Box } from "@mui/material";

interface Crumb {
  label: string;
  path: string;
}

interface RouteMatch {
  data: unknown;
  handle?: {
    crumb?: (data: unknown) => Crumb | Crumb[];
  };
}

export function Breadcrumbs() {
  const matches = useMatches() as RouteMatch[];

  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .flatMap((match) => {
      const crumbData = match.handle!.crumb!(match.data);
      return Array.isArray(crumbData) ? crumbData : [crumbData];
    });

  if (crumbs.length <= 1) return null;

  return (
    <Box sx={{ mb: 2 }}>
      <MuiBreadcrumbs aria-label="breadcrumb">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          
          return isLast ? (
            <Typography key={index} sx={{ fontWeight: 'bold' }}>
              {crumb.label}
            </Typography>
          ) : (
            <Link 
              key={index} 
              component={RouterLink} 
              to={crumb.path} 
              underline="hover" 
              color="text.disabled"
            >
              {crumb.label}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
}
