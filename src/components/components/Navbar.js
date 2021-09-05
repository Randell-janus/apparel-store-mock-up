import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { AccountHeroIcon, CartHeroIcon, ShopHeroIcon } from "../utils/Icons";
import MobileMenu from "./dropdown/MobileMenu";

const Navbar = () => {
  const { currentUser } = useAuth();
  const { totalBill } = useCart();

  return (
    <div>
      <nav className="border-b text-black">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex justify-between items-center">
            {/* NAV LOGO */}
            <Link to="/" className="my-4 md:my-6 text-center">
              <div className="flex items-center space-x-1">
                <img src="apxLOGO.svg" alt="apx logo" className="w-5 h-5" />
                <p className="text-2xl md:text-3xl font-bold italic tracking-tighter">
                  APX
                </p>
              </div>
              <p className="text-base md:text-lg font-medium tracking-widest">
                APPAREL
              </p>
            </Link>

            <section className="flex items-center space-x-14">
              {/* LANDLINE SECTION */}
              <div className="hidden md:block">
                <p className="font-medium tracking-wider">042-123-4568</p>
                <p className="text-xs text-gray-800 text-right">Open 24/7</p>
              </div>

              {/* ICON NAV BUTTONS */}
              <div className="hidden md:flex items-center space-x-5 md:space-x-6">
                <NavLink
                  exact
                  to="/"
                  className="hover:text-blue-400 transition duration-200"
                  activeClassName="text-blue-400"
                >
                  <ShopHeroIcon className="h-5 w-5" />
                </NavLink>

                <NavLink
                  to="/cart"
                  className="hover:text-blue-400 transition duration-200"
                  activeClassName="text-blue-400"
                >
                  <CartHeroIcon className="h-5 w-5" />
                </NavLink>

                <NavLink
                  to="/account"
                  className="hover:text-blue-400 transition duration-200"
                  activeClassName="text-blue-400"
                >
                  <AccountHeroIcon className="h-5 w-5" />
                </NavLink>
              </div>

              {/* MOBILE MENU BUTTON */}
              <MobileMenu className="md:hidden" />

              {/* TOTAL BILL SECTION */}
              {currentUser && (
                <div className="hidden md:block text-left">
                  <p className="text-xs text-gray-800">Your Cart</p>
                  <p className="font-medium tracking-wider">₱{totalBill}.00</p>
                </div>
              )}

              {/* LOGIN & SIGNUP SECTION */}
              {!currentUser && (
                <div className="hidden md:flex items-center">
                  <NavLink
                    to="/login"
                    className="hover:text-blue-400 transition duration-200"
                  >
                    Log In
                  </NavLink>

                  <h2 className="font-extralight mx-2">|</h2>

                  <NavLink
                    to="/signup"
                    className="hover:text-blue-400 transition duration-200"
                  >
                    Sign Up
                  </NavLink>
                </div>
              )}
            </section>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
