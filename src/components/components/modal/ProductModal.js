import { Dialog, Transition } from "@headlessui/react";
import { useCart } from "../../../contexts/CartContext";
import { PlusHeroIcon, MinusHeroIcon, CartHeroIcon } from "../../utils/Icons";

export default function ProductModal({ isOpen, setIsOpen, Fragment, product }) {
  const { addToCart, itemCount, setItemCount, decrementItemCount } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    setIsOpen(false);
    setItemCount(1);
  };

  const handleModalOnClose = () => {
    setIsOpen(false);
    setItemCount(1);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-30"
          onClose={handleModalOnClose}
        >
          <div className="min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <main className="inline-block w-3/4 max-w-sm p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded">
                <section className="bg-gray-100 flex items-center justify-center rounded relative">
                  <img
                    src="apxLOGO.svg"
                    alt="apx logo"
                    className="absolute top-4 left-4 w-4 h-4"
                  />
                  <img
                    src={product.productImg}
                    alt={`${product.category} item`}
                    className="w-44 p-6"
                  />
                </section>
                <section className="pt-4 space-y-8">
                  <header className="">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{product.name}</p>
                      <div className="flex items-center space-x-2">
                        <p>Qty</p>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={decrementItemCount}
                            className="focus:outline-none"
                          >
                            <MinusHeroIcon />
                          </button>

                          <p>{itemCount}</p>
                          <button onClick={() => setItemCount(itemCount + 1)}>
                            <PlusHeroIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                    <h2 className="font-light font-roboto">
                      ₱{product.price * itemCount}.00
                    </h2>
                  </header>
                  <footer className="space-y-3">
                    <div className="flex justify-between items-end">
                      <p className="font-light capitalize text-gray-400">
                        Type: {product.category}
                      </p>
                      <p className="font-light">{product.sales} sold</p>
                    </div>

                    <button
                      type="button"
                      className="btn-primary-filled flex items-center justify-center space-x-2 w-full py-2"
                      onClick={handleAddToCart}
                    >
                      <CartHeroIcon className="w-4 h-4 md:w-5 md:h-5" />
                      <p className="tracking-wider">Add to cart</p>
                    </button>
                  </footer>
                </section>
              </main>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
