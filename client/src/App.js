import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'


import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import HomeScreen from './screens/homeScreen/HomeScreen'
import ProductScreen from './screens/homeScreen/productScreen/ProductScreen'



const App = () => {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path="/" exact component={HomeScreen} />
                    <Route path="/product/:id" exact component={ProductScreen} />
                </Container>
            </main>
            {/* <Footer /> */}
        </Router>
    )
}

export default App
