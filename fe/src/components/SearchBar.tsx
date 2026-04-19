import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Autocomplete, TextField, CircularProgress, Box, Typography } from "@mui/material";
import { globalSearch, type SearchResult } from "../api/search";

export function SearchBar() {
  const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly SearchResult[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    if (inputValue.trim() === "") { setOptions([]); setLoading(false); return; }

    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const results = await globalSearch(inputValue);
        if (active) {
          setOptions(results);
        }
      } catch (error) {
        console.error("search failed", error);
      } finally {
        if (active) setLoading(false);
      }
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [inputValue]);

  const handleSelection = (event: any, newValue: SearchResult | null) => {
    if (!newValue) return;

    if (typeof newValue === "string") {
      navigate(`/search?q=${encodeURIComponent(newValue)}`);
      return;
    }
    
    switch (newValue.type) {
      case "artist":
        navigate(`/artists/${newValue.id}`);
        break;
      case "track":
        navigate(`/tracks/${newValue.id}`);
        break;
      case "tab":
        navigate(`/tracks/${newValue.parentId}/tabs/${newValue.id}`);
        break;
      case "release":
        navigate(`/artists/${newValue.parentId}#release-${newValue.id}`);
        break;
    }
  };

  return (
    <Autocomplete
      sx={{ width: 1 }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      onChange={handleSelection}
      filterOptions={(x) => x}
      isOptionEqualToValue={(option, value) => option.id === value.id && option.type === value.type}
      getOptionLabel={(option) => {
        if (typeof option === "string") return option; 

        switch (option.type) {
          case "artist": return option.name; break;
          case "track": return option.title; break;
          case "tab": return `${option.trackTitle} by ${option.author}`; break;
          case "release": return option.title; break;
          default: return "";
        }
      }}
      groupBy={(option) => option.type}
      options={options}
      loading={loading}
      autoHighlight
      freeSolo
      renderInput={(params) => <TextField {...params} placeholder="search..." />}
    />
  );
}
