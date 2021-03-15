import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink exact to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/storeitems" className="nav-link">
            Store Items
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/shoppinglist" className="nav-link">
            Shopping List
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/runninglow" className="nav-link">
            Running Low
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/createitem" className="nav-link">
            Create Item
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
