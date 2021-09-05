import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

import Navbar from "./components/Navbar";

import { AccountCard, AccountInput } from "./utils/AccountUtils";
import { PageHeading, PageLayout } from "./utils/PageUtils";
import SideNav from "./components/nav/SideNav";
import Footer from "./components/footer/Footer";

const Account = () => {
  const { currentUser, logout, updateEmail, updatePassword } = useAuth();
  const { totalBill, totalCartCount } = useCart();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const resetAllFields = async () => {
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
  };

  const handleLogout = async () => {
    await logout();
    history.push("/");
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setEmailError("");
      if (emailRef.current.value !== currentUser.email) {
        await updateEmail(emailRef.current.value);
        resetAllFields();
      } else {
        setEmailError("Duplicate email");
      }

      history.push("/account");
    } catch {
      setEmailError("Failed to update email");
    }
    setLoading(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setPasswordError("Passwords do not match");
    }
    try {
      setLoading(true);
      setPasswordError("");
      if (passwordRef.current.value) {
        await updatePassword(passwordRef.current.value);
      }
      resetAllFields();
      history.push("/account");
    } catch {
      setPasswordError("Failed to update password");
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
      <Navbar />
      <PageHeading header="Personal Account" />
      <PageLayout>
        <main className="flex md:space-x-10">
          <SideNav />

          <section className="flex-1 space-y-4">
            {/* YOUR EMAIL AND CART SUMMARY */}
            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
              <section className="account-card border">
                <h3 className="font-medium">Your Email</h3>
                <label>This is the email address you used to sign in.</label>
                <p className="input-outline overflow-auto w-full sm:w-3/4 md:w-3/5 lg:w-full">
                  {currentUser.email}
                </p>
              </section>
              <section className="account-card border flex-1">
                <h3 className="font-medium">Cart Summary</h3>
                <div className="flex justify-between">
                  <p>Items in cart:</p>
                  <p className="font-medium">{totalCartCount} items</p>
                </div>
                <div className="flex justify-between">
                  <p>Total price:</p>
                  <p className="font-roboto font-medium">₱{totalBill}.00</p>
                </div>
              </section>
            </div>
            {/* UPDATE EMAIL SECTION */}
            <form onSubmit={handleUpdateEmail} className="w-full">
              <AccountCard disabled={loading} buttonText="Save">
                <AccountInput
                  title="Update Email"
                  label="Enter new email address"
                  type="email"
                  innerRef={emailRef}
                  value={email}
                  onChange={handleEmailChange}
                  error={emailError}
                />
              </AccountCard>
            </form>

            {/* UPDATE PASSWORD SECTION */}
            <form onSubmit={handleUpdatePassword} className="w-full">
              <AccountCard
                disabled={loading}
                footer="Password must be at least 6 characters long."
                buttonText="Save"
              >
                <AccountInput
                  title="Update Password"
                  label="Enter new password"
                  type="password"
                  innerRef={passwordRef}
                  value={password}
                  onChange={handlePasswordChange}
                />
                <AccountInput
                  label="Confirm new password"
                  type="password"
                  innerRef={passwordConfirmRef}
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                  error={passwordError}
                />
              </AccountCard>
            </form>

            {/* LOGOUT BUTTON */}
            <footer className="flex md:hidden justify-end">
              <p className="btn-outline" onClick={handleLogout}>
                Log out of account
              </p>
            </footer>
          </section>
        </main>
      </PageLayout>
      <Footer />
    </>
  );
};

export default Account;
