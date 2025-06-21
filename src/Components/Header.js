import { Navbar } from "react-bootstrap";
import classes from "./Header.module.css";
import { Link } from "react-router";
import Card from "./UI/Card";

const Header = () => {
  return (
    <Card className="m-2 p-0">
      <Navbar className={classes.navbar}>
        <Link className={classes.link} to="/welcome">
          Home
        </Link>
        <Link className={classes.link} to="/addExpense">
          Add Expense
        </Link>
        <Link className={classes.link} to="/myExpense">
          My Expense
        </Link>
      </Navbar>
    </Card>
  );
};

export default Header;
