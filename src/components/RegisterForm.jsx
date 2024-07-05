import React, {Component} from "react";
import {useEffect, useContext, useState} from "react";
import {Link} from "react-router-dom";
import {
    API_PRODUCTS,
    CLIENT_ID,
    CLIENT_SECRET,
    GRANT_TYPE,
    OAUTH_TOKEN_URL,
    PASSWORD,
    SCOPE,
    SHOP_URL,
    USERNAME
} from "../config";
import {ShopContext} from "../context";

function RegisterForm() {
    // state = {
    //     username: '',
    //     email: '',
    //     password: '',
    //     showForm: false,
    //     current_user: false
    // }
    let {
        order = [],
        handleFormShow = Function.prototype,
    } = useContext(ShopContext);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showForm, setShowForm] = useState('');
    const [current_user, setCurrent_user] = useState('');

    const handleChange = (event) => {
        //console.log(event.target.value)
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
        setShowForm(!showForm)
    }

    const validateName = () => {
        if (username < 5) {
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

    const handleRegister = () => {
        const csrfToken = 'test';
        const username = username
        const password = password

        // https://www.drupalchamp.org/blog/user-login-rest-api-drupal8
        // @todo change
        const login_url = SHOP_URL + '/user/login?_format=json'
        // const login_url = SHOP_URL + '/user/login?_format=json'
        fetch(login_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken
            },
            body: JSON.stringify({
                'name': username,
                'pass': password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                    console.log('sddddsuccess', data);
                    localStorage.setItem('current_user', JSON.stringify(data.current_user));

                    setCurrent_user(data.current_user)
                    setShowForm(false)
                }
            );
    }

    // componentDidMount() {
    //     if (localStorage.getItem('current_user')) {
    //         const current_user = JSON.parse(localStorage.getItem('current_user'));
    //
    //     }
    // }

    useEffect(function getGoods() {

        if (localStorage.getItem('current_user')) {
            const current_user = JSON.parse(localStorage.getItem('current_user'));
            setCurrent_user(current_user)
        }
    }, []);

    return <div className="registerFormWrapper">
        {showForm? (<div className='registerForm'>
            <div className="form-header"><i className="material-icons form-close" onClick={handleShowForm}>close</i></div>
            <div className="form-inputs">
            <input
                    type="text"
                    placeholder="username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    onBlur={validateName}
                />
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    onBlur={validateMail}
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    onBlur={validatePassword}
                />
                <button className="secondary-content btn-small" onClick={handleRegister}>Register</button>
            </div>
        </div>) : ''}
        {
            !current_user && !current_user.name ? (
                    <a className="toggleLoginForm" href="#" onClick={handleShowForm}>Register</a>)
                : ''
        }
    </div>
    //}
}

export default RegisterForm;