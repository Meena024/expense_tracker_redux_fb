import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <Navbar>
        <nav className={classes.navLinks}>
          <Link className={classes.link} to="/welcome">
            Home
          </Link>
          <Link className={classes.link} to="/addExpense">
            Add Expense
          </Link>
          <Link className={classes.link} to="/myExpense">
            My Expense
          </Link>
        </nav>
      </Navbar>
    </div>
  );
};

export default Header;
