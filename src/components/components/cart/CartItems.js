import {
  PlusHeroIcon,
  MinusHeroIcon,
  TrashHeroIcon,
  TrashHeroIconSolid,
} from "../../utils/Icons";
import { Link } from "react-router-dom";
import { useCart } from "../../../contexts/CartContext";

const CartItems = () => {
  const {
    cartItems,
    totalBill,
    incrementCount,
    decrementCount,
    loading,
    removeItem,
  } = useCart();

  const handleDecrementCount = (item) => {
    if (item.count == 1) {
      removeItem(item);
    } else {
      decrementCount(item);
    }
  };

  const handleRemoveItem = (item) => {
    removeItem(item);
  };

  return (
    <>
      {totalBill != 0 && (
        <div className="md:hidden items-center justify-between mb-4 border-b pb-2 flex space-x-3">
          <p>Total price: </p>
          <h3 className="font-medium">₱{totalBill}.00</h3>
        </div>
      )}
      <section
        className={`lg:flex-1 flex flex-col space-y-8 3sm:space-y-4 overflow-y-auto ${
          totalBill == 0
            ? "border rounded items-center justify-center h-96"
            : "h-screen"
        }`}
      >
        {totalBill == 0 && (
          <div className="flex flex-col items-center space-y-4">
            <img src="apxLOGO.svg" alt="apx logo" className="w-10 h-10" />
            <div className="text-center">
              <h3 className="font-medium">All clear</h3>
              <p className="text-gray-400 font-light">
                Your cart is empty at the moment.
              </p>
            </div>
            <Link to="/" className="btn-primary-filled">
              SHOP NOW
            </Link>
          </div>
        )}

        {/* CART ITEMS CONTAINER */}
        {!loading &&
          cartItems.map((item, i) => (
            <div
              key={i}
              className="flex flex-row justify-between items-center 3sm:border rounded relative"
            >
              {/* TRASH ICON UPPERLEFT  */}
              <div className="absolute top-1 left-1 3sm:top-2 3sm:left-2">
                <button
                  className="bg-white rounded p-1 shadow btn-scale"
                  onClick={() => handleRemoveItem(item)}
                >
                  <TrashHeroIcon className="hidden 3sm:block h-4 w-4 text-gray-800" />
                  <TrashHeroIconSolid className="block 3sm:hidden h-3 w-3 text-gray-800" />
                </button>
              </div>
              {/* IMAGE SECTION */}
              <section className="h-full w-24 p-2 3sm:w-32 3sm:p-6 bg-gray-100 flex items-center justify-center overflow-hidden rounded 3sm:rounded-none">
                <img src={item.image} alt={item.category} className="p-2" />
              </section>
              {/* DETAILS SECTION */}
              <section className="h-full w-full space-y-4 lg:space-y-0 flex flex-col justify-center lg:flex-row lg:items-center lg:justify-between flex-1 py-2 pl-3 3sm:px-6">
                {/* NAME AND TYPE */}
                <div className="flex flex-col items-start">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="font-light capitalize text-gray-400">
                    Type: {item.category}
                  </p>
                </div>
                {/* PRICE AND QTY */}
                <div className="flex justify-between items-center lg:w-1/2">
                  {/* PRICE */}
                  <h2 className="font-light font-roboto">₱{item.price}</h2>
                  {/* QTY */}
                  <div className="flex items-center space-x-2">
                    <p>Qty</p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDecrementCount(item)}
                        className="focus:outline-none"
                      >
                        <MinusHeroIcon />
                      </button>
                      <p>{item.count}</p>
                      <button onClick={() => incrementCount(item)}>
                        <PlusHeroIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}
        {totalBill != 0 && (
          <div className="hidden items-center justify-end pt-3 md:flex space-x-3 border-t">
            <p>Total price: </p>
            <h3 className="font-medium">₱{totalBill}.00</h3>
          </div>
        )}
      </section>
    </>
  );
};

export default CartItems;
