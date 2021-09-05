import { useState, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import {
  FormLayout,
  FormHeading,
  FormInput,
  FormFooter,
} from "./utils/FormUtils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };
  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
  };

  return (
    <>
      <FormLayout>
        <FormHeading
          header="Log in to your account"
          subheader="So we can bring you the elements of style!"
        />
        <form className="form-card" onSubmit={handleLogin}>
          {/* email input */}
          <FormInput
            label="Email Address"
            type="email"
            innerRef={emailRef}
            value={email}
            onChange={handleEmailChange}
          />
          {/* password input */}
          <FormInput
            label="Password"
            type="password"
            innerRef={passwordRef}
            value={password}
            onChange={handlePasswordChange}
          />
          {error && <p className="text-red-600">{error}</p>}
          <button
            className="btn-primary-filled"
            type="submit"
            disabled={loading}
          >
            Log in
          </button>

          <Link to="/forgot-password" className="text-link text-center">
            Forgot your password?
          </Link>
        </form>
        <FormFooter
          footer="Don't have an account?"
          to="/signup"
          type="Sign up"
        />
      </FormLayout>
    </>
  );
};

export default Login;
