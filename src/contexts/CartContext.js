import React, { useContext, useState, useEffect, createContext } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { firestore } from "../firebase";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);

  const [cartItems, setCartItems] = useState();
  const [totalBill, setTotalBill] = useState(0);
  const [totalCartCount, setTotalCartCount] = useState(0);

  const cartRef = firestore.collection(
    `Users/${currentUser && currentUser.uid}/Cart`
  );

  const [itemCount, setItemCount] = useState(1);

  const decrementItemCount = () => {
    if (itemCount > 1) {
      setItemCount((prev) => prev - 1);
    }
  };

  const incrementItemInCart =
    firebase.firestore.FieldValue.increment(itemCount);
  const incrementCartItem = firebase.firestore.FieldValue.increment(1);
  const decrementCartItem = firebase.firestore.FieldValue.increment(-1);

  const history = useHistory();

  const getCart = () => {
    setLoading(true);

    cartRef.onSnapshot((querySnapshot) => {
      const items = [];
      const prices = [];
      const cartCount = [];

      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
        prices.push(doc.data().price * doc.data().count);
        cartCount.push(doc.data().count);
      });
      setCartItems(items);
      if (querySnapshot.size > 0) {
        setTotalBill(prices.reduce((a, b) => a + b));
        setTotalCartCount(cartCount.reduce((a, b) => a + b));
      } else {
        setTotalBill(0);
        setTotalCartCount(0);
      }
      // console.log(cartItems);
      setLoading(false);
    });
  };

  const addToCart = (product) => {
    const docRef = cartRef.doc(product.id);

    docRef.get().then((doc) => {
      if (currentUser) {
        if (doc.exists) {
          // console.log("updated. check db");
          docRef.update({
            count: incrementItemInCart,
          });
        } else {
          // console.log("added. check db");
          docRef.set(
            {
              name: product.name,
              price: product.price,
              count: itemCount,
              image: product.productImg,
              category: product.category,
            },
            { merge: true }
          );
        }
      } else {
        history.push("/login");
        // console.log("Log in to use cart");
      }
    });
  };

  const incrementCount = (item) => {
    const docRef = cartRef.doc(item.id);

    docRef.update({
      count: incrementCartItem,
    });
  };

  const decrementCount = (item) => {
    const docRef = cartRef.doc(item.id);
    
    docRef.update({
      count: decrementCartItem,
    });
  };

  const removeItem = (item) => {
    cartRef.doc(item.id).delete();
  };

  useEffect(() => {
    getCart();
  }, [currentUser]);

  const value = {
    cartItems,
    totalBill,
    addToCart,
    incrementCount,
    decrementCount,
    loading,
    totalCartCount,
    itemCount,
    setItemCount,
    incrementItemInCart,
    decrementItemCount,
    removeItem,
  };

  return (
    <CartContext.Provider value={value}>
      {!loading && children}
    </CartContext.Provider>
  );
};
