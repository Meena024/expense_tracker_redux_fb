import { Form } from "react-bootstrap";
import Card from "../../UI/Card";
import classes from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../Firebase/initialize";

const Login = () => {
  const mailRef = useRef(null);
  const passref = useRef(null);

  const navigate = useNavigate();
  const loginHandler = (e) => {
    e.preventDefault();
    const login_details = {
      email: mailRef.current.value,
      password: passref.current.value,
    };
    // console.log(login_details);

    const handleLogin = async () => {
      try {
        await signInWithEmailAndPassword(
          getAuth(firebaseApp),
          login_details.email,
          login_details.password
        );
        // console.log("Logged In");
      } catch (err) {
        console.log(err.message);
      }
    };

    handleLogin();
    navigate("/welcome");
  };

  return (
    <Card className="my-5">
      <h2 className="py-3">Login</h2>
      <Form className={classes.form} onSubmit={loginHandler}>
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
              ref={mailRef}
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
              id="password"
              type="password"
              className="form-control"
              placeholder="Password"
              ref={passref}
              autoComplete="password"
            />
          </div>
        </div>

        <div className="d-flex justify-content-center m-3">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
      </Form>
      <Link className={classes.link} to="/signup">
        Create a new account? SIGN UP
      </Link>
    </Card>
  );
};

export default Login;
