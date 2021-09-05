import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

import {
  FormLayout,
  FormHeading,
  FormInput,
  FormFooter,
} from "./utils/FormUtils";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <FormLayout>
        <FormHeading
          header="Forgot Password?"
          subheader="Enter your email to receive further instructions."
        />
        <form className="form-card" onSubmit={handleSubmit}>
          {/* email input */}
          <FormInput label="Email Address" type="email" innerRef={emailRef} />
          {error && <p className="text-red-600">{error}</p>}
          {message && <p className="text-green-600">{message}</p>}
          <button
            className="btn-primary-filled"
            type="submit"
            disabled={loading}
          >
            Reset Password
          </button>

          <Link to="/login" className="text-link text-center">
            Log in to your account
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
}
