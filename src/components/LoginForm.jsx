import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {SHOP_URL} from "../config";

import {ShopContext} from "../context";

function LoginForm(props) {

    const {loginUser, alertName} = useContext(ShopContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [current_user, setCurrentUSer] = useState(false);
    const [statusMessage, setStatusMessage] = useState(false);

    const handleChange = (event) => {
        console.log(event.target.value)
        //this.setState({[event.target.name]: event.target.value})
        const input_value = event.target.value;
        switch (event.target.name) {
            case 'username':
                setUsername(input_value);
                break;
            case 'email':
                setEmail(input_value);
                break;
            case 'password':
                setPassword(input_value);
                break;
        }
    }

    const handleShowForm = (event) => {
        // this.setState({showForm: !this.state.showForm})
        setShowForm(!showForm)
    }

    const loginUserAsync = async () => {
        const csrfToken = 'test';
        // https://www.drupalchamp.org/blog/user-login-rest-api-drupal8
        const login_url = SHOP_URL + '/user/login?_format=json'
        const response = await fetch(login_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken
            },
            body: JSON.stringify({
                'name': username,
                'pass': password,
            }),
        });
        return await response.json();
    }

    const handleLogin = () => {
        const csrfToken = 'test';

        // https://www.drupalchamp.org/blog/user-login-rest-api-drupal8
        const login_url = SHOP_URL + '/user/login?_format=json'
        loginUserAsync().then(data => {
                console.log('Success', data);
                if (data.current_user) {
                    localStorage.setItem('current_user', JSON.stringify(data.current_user));
                    //this.setState({current_user: data.current_user, showForm: false})
                    setCurrentUSer(data.current_user);
                    setShowForm(false)
                    props.hideRegister(false)
                    loginUser(data.current_user.name)
                } else {
                    console.log(data.message)
                    setStatusMessage(data.message)
                }
            }
        );
    }

    const validateName = () => {
        if (username.length < 5) {
            //alert('Your first name can\'t be less then 5 letters');
        }
    }

    const validateMail = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            // return true;
            //alert('You have entered invalid email');
        }
    }

    const validatePassword = () => {
        if (password.length < 3) {
            //alert('Your password can\'t be less then 3 letters');
        }
    }

    const Logout = () => {
        setCurrentUSer('')
        localStorage.removeItem('current_user')
        props.hideRegister(true)
    }

    useEffect(function getGoods() {
        if (localStorage.getItem('current_user')) {
            const current_user = JSON.parse(localStorage.getItem('current_user'));
            setCurrentUSer(current_user)
            props.hideRegister(false)
        }
    }, []);

    return <div className="loginFormWrapper">
        {showForm ? (<div className='loginForm'>
            <div className="form-header"><i className="material-icons form-close" onClick={handleShowForm}>close</i>
            </div>
            <div className="form-inputs">
                <div className="login-status">{statusMessage}</div>
                <input
                    type="text"
                    placeholder="username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    onBlur={validateName}
                />
                {/*<input*/}
                {/*    type="email"*/}
                {/*    placeholder="email"*/}
                {/*    name="email"*/}
                {/*    value={email}*/}
                {/*    onChange={this.handleChange}*/}
                {/*    onBlur={this.validateMail}*/}
                {/*/>*/}
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    onBlur={validatePassword}
                />
                <button className="secondary-content btn-small" onClick={handleLogin}>Login</button>
            </div>
        </div>) : ''}
        {
            !current_user && !current_user.name ? (<a className="toggleLoginForm" href="#" onClick={handleShowForm}>Login</a>)
                : (<span className="currentUser"> Hello: <Link className="user-page-link" to="/user/">{current_user.name}</Link>
                    <div className="divider"></div> <a className="logout" href="#" onClick={Logout}>Logout</a> </span>)
        }
    </div>
}

export default LoginForm;