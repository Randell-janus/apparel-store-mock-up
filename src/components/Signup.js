import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import {
  FormLayout,
  FormHeading,
  FormInput,
  FormFooter,
} from "./utils/FormUtils";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const history = useHistory();

  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
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
  const handlePasswordConfirmChange = (e) => {
    const passwordConfirmValue = e.target.value;
    setPasswordConfirm(passwordConfirmValue);
  };

  return (
    <>
      <FormLayout>
        <FormHeading
          header="Sign up for an account"
          subheader="So we can bring you the elements of style!"
        />
        <form className="form-card" onSubmit={handleSignup}>
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
            passwordCondition="(must be at least 6 characters)"
            type="password"
            innerRef={passwordRef}
            value={password}
            onChange={handlePasswordChange}
          />
          {/* password confirmation input */}
          <FormInput
            label="Confirm Password"
            type="password"
            innerRef={passwordConfirmRef}
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />
          {error && <p className="text-red-600">{error}</p>}
          <button
            className="btn-primary-filled"
            type="submit"
            disabled={loading}
          >
            Sign up
          </button>
        </form>
        <FormFooter
          footer="Already have an account?"
          to="/login"
          type="Log in"
        />
      </FormLayout>
    </>
  );
};

export default Signup;
