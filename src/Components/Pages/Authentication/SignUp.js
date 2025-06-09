import { Form } from "react-bootstrap";
import Card from "../../UI/Card";
import classes from "./SignUp.module.css";
import { Link } from "react-router";

const SignUp = () => {
  return (
    <Card>
      <h2 className="py-3">Sign Up</h2>
      <Form className={classes.form}>
        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="name">Name:</label>
          </div>
          <div className="col-9">
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>
        </div>

        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="email">E-Mail ID:</label>
          </div>
          <div className="col-9">
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="E-Mail id"
            />
          </div>
        </div>

        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="password">Password:</label>
          </div>
          <div className="col-9">
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="confirmPassword">Confirm Password:</label>
          </div>
          <div className="col-9">
            <input
              id="confirmPassword"
              type="password"
              className="form-control"
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <div className="d-flex justify-content-center m-3">
          <button className="btn btn-primary" type="submit">
            Sign Up
          </button>
        </div>
      </Form>
      <Link className={classes.link} to="/login">
        Already having an account? LOGIN
      </Link>
    </Card>
  );
};

export default SignUp;
