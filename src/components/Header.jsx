import {Link} from "react-router-dom";
import LoginForm from "./LoginForm";
function Header() {
    return <nav className="green darken-1">
        <div className="nav-wrapper">
            <a href="#" className="brand-logo">React Shop</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down green darken-1">
                <Link to='/'>Home</Link>
                <Link to='/contact'>Contacts</Link>
                <Link to='/about'>About</Link>
            </ul>
            <LoginForm/>
        </div>
    </nav>
}

export default Header;