import { Navbar } from "react-bootstrap";
import classes from "./Header.module.css";
import { Link } from "react-router";
import Card from "./UI/Card";

const Header = () => {
  return (
    <Card className="m-5 p-0">
      <Navbar className="m-2">
        <div className={classes.navLinks}>
          <Link className={classes.link} to="/welcome">
            Home
          </Link>
          <Link className={classes.link} to="/addExpense">
            Add Expense
          </Link>
          <Link className={classes.link} to="/myExpense">
            My Expense
          </Link>
        </div>
      </Navbar>
    </Card>
  );
};

export default Header;
