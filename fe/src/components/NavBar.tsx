import { Link, Form } from "react-router";
import { AppBar, Toolbar, Button, Autocomplete } from "@mui/material";
import { SearchBar } from "./SearchBar";

export function NavBar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <span>guitar tabs</span>
        <Button component={Link} to="/">home</Button>
        <Button component={Link} to="/artists">artists</Button>
        <Button component={Link} to="/tabs">tabs</Button>

        <SearchBar />
      </Toolbar>
    </AppBar>
  );
}
