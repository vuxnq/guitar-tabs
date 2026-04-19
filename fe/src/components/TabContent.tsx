import { Box } from "@mui/material";

// CDEFGAB + [b/#] + [m/maj/min/dim/aug/sus] + number + bass tone (/G)
const CHORD_REGEX = /(\b[CDEFGAB](?:b|#)?(?:m|maj|min|dim|aug|sus|add)?\d*(?:\/[CDEFGAB](?:b|#)?)?(?=\s|$|[.,;)-]))/g;

interface TabContentProps {
  content: string;
}

export function TabContent({ content }: TabContentProps) {
  const parts = content.split(CHORD_REGEX);

  return (
    <Box
      component="pre"
      sx={{
        m: 0,
        p: 2,
        overflow: "auto",
        fontSize: "0.9rem",
        border: "1px solid",
        borderColor: "divider",
        fontFamily: "monospace",
        whiteSpace: "pre-wrap",
      }}
    >
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          return (
            <Box key={index} component="span"
              sx={{
                color: "primary.main",
                fontWeight: "bold",
              }}
            >
              {part}
            </Box>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </Box>
  );
}
