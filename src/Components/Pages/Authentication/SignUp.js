import { Form } from "react-bootstrap";
import Card from "../../UI/Card";
import classes from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import firebaseApp from "../../Firebase/initialize";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const SignUp = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();
  const signUpHandler = (e) => {
    e.preventDefault();
    const signUp_details = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(signUp_details);

    const auth = getAuth(firebaseApp);

    const handleSignUp = async () => {
      try {
        await createUserWithEmailAndPassword(
          auth,
          signUp_details.email,
          signUp_details.password
        );
        console.log("User signed up");
      } catch (err) {
        console.log(err.message);
      }
    };

    handleSignUp();
    navigate("/welcome");
  };

  return (
    <Card>
      <h2 className="py-3">Sign Up</h2>
      <Form className={classes.form} onSubmit={signUpHandler}>
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
              ref={nameRef}
              autoComplete="name"
            />
          </div>
        </div>

        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="email">E-Mail ID:</label>
          </div>
          <div className="col-9">
            <input
              id="email_id"
              type="email"
              className="form-control"
              placeholder="E-Mail id"
              ref={emailRef}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="password">Password:</label>
          </div>
          <div className="col-9">
            <input
              id="pasword"
              type="password"
              className="form-control"
              placeholder="Password"
              ref={passwordRef}
              autoComplete="current-password"
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
              ref={confirmPasswordRef}
              autoComplete="current-password"
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
