import Navbar from "./components/Navbar";
import { PageHeading, PageLayout } from "./utils/PageUtils";
import { useCart } from "../contexts/CartContext";
import CartItems from "./components/cart/CartItems";

import { NavLink } from "react-router-dom";
import SideNav from "./components/nav/SideNav";
import Footer from "./components/footer/Footer";

const Cart = () => {
  const { totalCartCount } = useCart();

  return (
    <>
      <Navbar />
      <PageHeading header={`My Cart(${totalCartCount})`} />
      <PageLayout>
        <main className="flex md:space-x-10">
          <SideNav />
          <section className="flex-1">
            <CartItems />
          </section>
        </main>
      </PageLayout>
      <Footer/>
    </>
  );
};

export default Cart;
