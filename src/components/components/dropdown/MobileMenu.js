import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  AccountHeroIcon,
  CartHeroIcon,
  ShopHeroIcon,
  HamburgerHeroIcon,
  SignUpHeroIcon,
  LogoutHeroIcon,
} from "../../utils/Icons";
import { useAuth } from "../../../contexts/AuthContext";

export default function MobileMenu({ className }) {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.push("/");
  };

  let mobileOptions = [];

  if (currentUser) {
    mobileOptions = [
      {
        name: "Home",
        icon: <ShopHeroIcon className="w-5 h-5 mr-2" />,
        link: "/",
      },
      {
        name: "My Cart",
        icon: <CartHeroIcon className="w-5 h-5 mr-2" />,
        link: "/cart",
      },
      {
        name: "Account",
        icon: <AccountHeroIcon className="w-5 h-5 mr-2" />,
        link: "/account",
      },
    ];
  } else {
    mobileOptions = [
      {
        name: "Home",
        icon: <ShopHeroIcon className="w-5 h-5 mr-2" />,
        link: "/",
      },
      {
        name: "Log In",
        icon: <SignUpHeroIcon className="w-5 h-5 mr-2" />,
        link: "/login",
      },
      {
        name: "Sign Up",
        icon: <AccountHeroIcon className="w-5 h-5 mr-2" />,
        link: "/signup",
      },
    ];
  }

  return (
    <Menu as="div" className={`relative ${className}`}>
      <div>
        <Menu.Button className="flex focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <HamburgerHeroIcon className="btn-scale w-7 h-7" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Menu.Items className="z-10 absolute right-0 w-32 mt-2 bg-white rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-2">
            {mobileOptions.map((option, i) => (
              <Menu.Item key={i}>
                {({ active }) => (
                  <Link
                    to={option.link}
                    className={`${
                      active ? "bg-gray-100 text-black" : "text-black"
                    } group flex rounded-md items-center w-full px-2 py-2`}
                  >
                    {option.icon}
                    {option.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
            {currentUser && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      active ? "bg-gray-100 text-black" : "text-black"
                    } group flex rounded-md items-center w-full px-2 py-2`}
                  >
                    <LogoutHeroIcon className="w-5 h-5 mr-2" />
                    <p>Log Out</p>
                  </button>
                )}
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
