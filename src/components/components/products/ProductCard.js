import { useState, Fragment } from "react";
import ProductModal from "../modal/ProductModal";

const ProductCard = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="overflow-hidden group relative cursor-pointer"
      onClick={() => setIsOpen(true)}
    >
      <section className="relative rounded bg-gray-100 group-hover:bg-gray-200 transition duration-200 flex items-center justify-center">
        <img
          src="apxLOGO.svg"
          alt="apx logo"
          className="absolute top-4 left-4 w-4 h-4"
        />
        <img
          src={product.productImg}
          alt="seafood product"
          className="w-44 p-8"
        />
      </section>
      <section className="py-4">
        <p className="font-medium">{product.name}</p>
        <h2 className="font-light font-roboto">₱{product.price}.00</h2>
      </section>

      <ProductModal
        Fragment={Fragment}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        product={product}
      />
    </div>
  );
};

export default ProductCard;
