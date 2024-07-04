import logo from './logo.svg';
import {useContext, useEffect} from "react";
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Header from "./components/Header";
import {Footer} from "./components/Footer";
import Shop from "./components/Shop";
import {ContextProvider, ShopContext} from "./context";
import About from "./pages/About";
import Contact from "./pages/Contact";
import {Movie} from "./pages/Movie";
import NotFound from "./pages/NotFound";
import {ProductPage} from "./pages/ProductPage";
import {UserPage} from "./pages/UserPage";
import UserOrders from "./pages/UserOrders";
import ArticlesList from "./pages/ArticlesList";
import Cart from "./components/Cart";

// https://github.com/ladovod444/react-shop-drupal
function App() {
    return (
        <>
            <Router>
                <ContextProvider>
                    <Header/>

                    {/*<Shop/>*/}
                    <Routes>
                        <Route exact path="/" Component={Shop}/>
                        <Route path="/about" Component={About}/>
                        <Route path="/contact" Component={Contact}/>
                        <Route path="/articles" Component={ArticlesList}/>
                        <Route path="/product/:id" Component={ProductPage}/>
                        <Route path="/user" Component={UserPage}/>
                        <Route path="/orders" Component={UserOrders}/>
                        <Route path="*" Component={NotFound}/>
                    </Routes>
                </ContextProvider>
                <Footer/>
            </Router>
        </>
    );
}

export default App;
