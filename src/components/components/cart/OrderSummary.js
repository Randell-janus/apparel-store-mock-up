import { useCart } from "../../../contexts/CartContext";

const OrderSummary = ({ className, btnClassName }) => {
  const { totalBill } = useCart();

  return (
    <>
      <section
        className={`${className} h-full rounded-2xl flex-col space-y-10`}
      >
        <div>
          <h3 className="font-medium mb-4">Order Summary</h3>
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>₱{totalBill}</p>
          </div>
          <div className="flex justify-between my-1">
            <p>Shipping Fee</p>
            <p>₱100</p>
          </div>
          <div className="flex justify-between border-t border-gray-300 mt-2 py-2">
            <p>Total Bill</p>
            <p className="text-trace-blue-light font-medium">
              ₱{totalBill + 100}
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className={`${btnClassName} py-2 bg-trace-blue-light rounded-xl text-white hover:bg-trace-blue-default transition duration-100`}
          >
            Checkout
          </button>
        </div>
      </section>
    </>
  );
};

export default OrderSummary;
