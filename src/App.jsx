import logo from './logo.svg';
import {useEffect} from "react";
import './App.css';
import Header from "./components/Header";
import {Footer} from "./components/Footer";
import Shop from "./components/Shop";
import {ContextProvider} from "./context";

//https://bitbucket.org/ladovod/workspace/repositories/
//https://bitbucket.org/ladovod/shop_react/src/main/
function App() {
    return (
        <>
            <Header/>
            <ContextProvider>
                <Shop/>
            </ContextProvider>
            <Footer/>
        </>
    );
}

export default App;
