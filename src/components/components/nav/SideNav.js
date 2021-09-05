import { NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const SideNav = () => {
  const { currentUser, logout, updateEmail, updatePassword } = useAuth();

  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.push("/");
  };

  return (
    <section className="w-48 hidden md:flex">
      <div className="py-2 space-y-4 flex flex-col">
        <NavLink to="/cart" activeClassName="font-semibold text-black w-max">
          Shopping Cart
        </NavLink>
        <NavLink to="/account" activeClassName="font-semibold text-black w-max">
          General Settings
        </NavLink>
        <button className="text-left w-max" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </section>
  );
};

export default SideNav;
