import Account from "./components/Account";
import PrivateRoute from "./routes/PrivateRoute";

import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Cart from "./components/Cart";

import { AuthProvider } from "./contexts/AuthContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Products from "./components/Products";
import { CartProvider } from "./contexts/CartContext";


function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ProductsProvider>
            <CartProvider>
              <Switch>
                <PrivateRoute path="/account" component={Account} />
                <PrivateRoute path="/cart" component={Cart} />
                <Route exact path="/" component={Products} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
            </CartProvider>
          </ProductsProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
