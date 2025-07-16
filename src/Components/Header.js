import { Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className={classes.header}>
      <Navbar>
        <nav className={classes.navLinks}>
          <Link
            to="/welcome"
            className={`${classes.link} ${
              isActive("/welcome") ? classes.active : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/addExpense"
            className={`${classes.link} ${
              isActive("/addExpense") ? classes.active : ""
            }`}
          >
            Add Expense
          </Link>
          <Link
            to="/myExpense"
            className={`${classes.link} ${
              isActive("/myExpense") ? classes.active : ""
            }`}
          >
            My Expense
          </Link>
        </nav>
      </Navbar>
    </div>
  );
};

export default Header;
