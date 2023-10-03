import { Link } from "react-router-dom";

export const navMenu = (
  <>
    <li>
      <a>Home</a>
    </li>
    <li>
      <Link to="/dashboard">Dashboard</Link>
    </li>
    <li>
      <a>Event</a>
    </li>
    <li>
      <Link to="/login" className="btn md:hidden btn-primary inline btn-sm">
        Login
      </Link>
    </li>
  </>
);
