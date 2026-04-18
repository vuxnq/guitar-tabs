import { Link, Form } from "react-router";

export function Navbar() {
  return (
    <nav>
      <span>guitar tabs (TODO: vymyslet branding more)</span>
      <Link to="/">home</Link>
      <Link to="/artists">artists</Link>
      <Link to="/tabs">tabs</Link>

      <Form action="/search" method="GET">
        <input type="search" name="q" placeholder="search..." required />
        <button type="submit">search</button>
      </Form>
    </nav>
  );
}
