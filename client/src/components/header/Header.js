import React from "react"
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/actions/userAction"
import { Route, useHistory } from "react-router-dom"
import SearchBox from "../searchBox/SearchBox"

const Header = () => {
   const dispatch = useDispatch()
   const userLogin = useSelector(state => state.userLogin)
   const { userInfo } = userLogin
   const history = useHistory()
   //    console.log(history)
   const logoutHandler = () => {
      dispatch(logout())
      history.push("/login")
   }
   return (
      <header>
         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
               <LinkContainer to="/">
                  <Navbar.Brand>Shopify</Navbar.Brand>
               </LinkContainer>
               <Navbar.Toggle aria-controls="responsive-navbar-nav" />
               <Navbar.Collapse id="responsive-navbar-nav">
                  <SearchBox />
                  <Nav className="ml-auto">
                     <LinkContainer to="/cart">
                        <Nav.Link>Cart</Nav.Link>
                     </LinkContainer>
                     {userInfo ? (
                        <NavDropdown title={userInfo.name} id="username">
                           <LinkContainer to="/profile">
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                           </LinkContainer>

                           <NavDropdown.Item onClick={logoutHandler}>
                              Logout
                           </NavDropdown.Item>
                        </NavDropdown>
                     ) : (
                        <LinkContainer to="/login">
                           <Nav.Link>Sign in</Nav.Link>
                        </LinkContainer>
                     )}
                     {userInfo && userInfo.isAdmin && (
                        <NavDropdown title="Admin" id="adminmenu">
                           <LinkContainer to="/admin/userlist">
                              <NavDropdown.Item>Users</NavDropdown.Item>
                           </LinkContainer>

                           <LinkContainer to="/admin/productlist">
                              <NavDropdown.Item>Products</NavDropdown.Item>
                           </LinkContainer>
                           <LinkContainer to="/admin/orderlist">
                              <NavDropdown.Item>Orders</NavDropdown.Item>
                           </LinkContainer>
                        </NavDropdown>
                     )}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   )
}

export default Header
