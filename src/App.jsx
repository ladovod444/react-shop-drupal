import logo from './logo.svg';
import {useEffect} from "react";
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Header from "./components/Header";
import {Footer} from "./components/Footer";
import Shop from "./components/Shop";
import {ContextProvider} from "./context";
import About from "./pages/About";
import Contact from "./pages/Contact";
import {Movie} from "./pages/Movie";
import NotFound from "./pages/NotFound";
import {ProductPage} from "./pages/ProductPage";

// https://github.com/ladovod444/react-shop-drupal
function App() {
    return (
        <>
            <Router>
            <Header/>
            <ContextProvider>
                {/*<Shop/>*/}
                <Routes>
                    <Route exact path="/" Component={Shop}  />
                    <Route path="/about" Component={About}  />
                    <Route path="/contact" Component={Contact}  />
                    <Route path="/product/:id" Component={ProductPage}  />
                    <Route path="*" Component={NotFound}  />
                </Routes>
            </ContextProvider>
            <Footer/>
            </Router>
        </>
    );
}

export default App;
