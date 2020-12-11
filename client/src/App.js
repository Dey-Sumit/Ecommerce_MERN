import React from "react"
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Route } from "react-router-dom"

// import Footer from './components/footer/Footer'
import Header from "./components/header/Header"
import CartScreen from "./screens/cartScreen/CartScreen"
import HomeScreen from "./screens/homeScreen/HomeScreen"
import ProductScreen from "./screens/homeScreen/productScreen/ProductScreen"
import LoginScreen from "./screens/loginScreen/LoginScreen"
import OrderScreen from "./screens/orderScreen/OrderScreen"
import PaymentScreen from "./screens/paymentScreen/PaymentScreen"
import PlaceOrderScreen from "./screens/placeOrder/PlaceOrderScreen"
import ProductEditScreen from "./screens/productEditScreen/ProductEditScreen"
import ProductsListScreen from "./screens/productsListScreen/ProductsListScreen"

import ProfileScreen from "./screens/profileScreen/ProfileScreen"
import RegisterScreen from "./screens/registerScreen/RegisterScreen"
import ShippingScreen from "./screens/shippingScreeen/ShippingScreen"
import UserEditScreen from "./screens/userEditScreen/UserEditScreen"
import UserListScreen from "./screens/userListScreen/UserListScreen"

const App = () => {
   return (
      <Router>
         <Header />
         <main className="py-3">
            <Container>
               <Route
                  path="/admin/user/:id/edit"
                  exact
                  component={UserEditScreen}
               />
               <Route
                  path="/admin/product/:id/edit"
                  exact
                  component={ProductEditScreen}
               />
               <Route path="/" exact component={HomeScreen} />
               <Route path="/product/:id" exact component={ProductScreen} />
               <Route path="/cart/:id?" exact component={CartScreen} />
               <Route path="/login" exact component={LoginScreen} />
               <Route path="/register" exact component={RegisterScreen} />
               <Route path="/profile" exact component={ProfileScreen} />
               <Route path="/order/:id" exact component={OrderScreen} />
               <Route path="/shipping" exact component={ShippingScreen} />
               <Route path="/payment" exact component={PaymentScreen} />
               <Route path="/placeorder" exact component={PlaceOrderScreen} />
               <Route path="/admin/userlist" exact component={UserListScreen} />
               <Route
                  path="/admin/productlist"
                  exact
                  component={ProductsListScreen}
               />
               <Route path="/search/:keyword" exact component={HomeScreen} />
            </Container>
         </main>
         {/* <Footer /> */}
      </Router>
   )
}

export default App
