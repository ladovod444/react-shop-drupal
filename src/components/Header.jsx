import {Link} from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Cart from "./Cart";
import {useContext} from "react";
import {ShopContext} from "../context";
import BasketList from "./BasketList";
import Alert from "./Alert";
function Header() {
    const {order, isBasketShow, alertName} = useContext(ShopContext);
    return <div>
        <nav className="green darken-1">
            <div className="nav-wrapper">
                <a href="#" className="brand-logo">React Shop</a>
                <LoginForm/>
                <span> OR </span>
                <RegisterForm/>
                <ul id="nav-mobile" className="right hide-on-med-and-down green darken-1">
                    <Link to='/'>Home</Link>
                    <Link to='/contact'>Contacts</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/articles'>Articles</Link>
                </ul>
            </div>

        </nav>
        <Cart quantity={order.length}/>
        {isBasketShow &&
            (<BasketList/>
            )}
        {
            alertName && <Alert />
        }
    </div>
}

export default Header;