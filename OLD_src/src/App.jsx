import logo from './logo.svg';
import {useEffect} from "react";
import './App.css';
import Header from "./components/Header";
import {Footer} from "./components/Footer";
import Shop from "./components/Shop";

function App() {

    useEffect(() => {
        // fetch(API_URL, {
        //         method: 'GET',
        //         headers: {
        //             'Authorization': API_KEY,
        //         },
        //     }
        // ).then(
        //     (result) => result.json()
        // ).then(
        //     data => console.log(data.shop)
        // )
    }, []);

    return (
        <>
            <Header/>
            <Shop/>
            <Footer/>
        </>
    );
}

export default App;
