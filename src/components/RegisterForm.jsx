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
    USERNAME,
    API_USER_REGISTER, API_CREATE_ORDER
} from "../config";
import {ShopContext} from "../context";

function RegisterForm({hideLogin}) {

    let user = ''


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showForm, setShowForm] = useState('');
    const [current_user, setCurrent_user] = useState(user);

    // useEffect(function getGoods() {
    //     if (localStorage.getItem('current_user')) {
    //         const user = JSON.parse(localStorage.getItem('current_user'));
    //         setCurrent_user(user)
    //     }
    // }, []);

    const handleChange = (event) => {
        //console.log(event.target.value)
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
        //const csrfToken = 'test';
        // const username = username
        // const password = password

        // https://www.drupalchamp.org/blog/user-login-rest-api-drupal8
        // @todo change
        //const login_url = SHOP_URL + '/user/login?_format=json'
        const oauth_shop_url = SHOP_URL + OAUTH_TOKEN_URL;

        const data = {
            'grant_type': GRANT_TYPE,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'scope': SCOPE,
            'username': USERNAME,
            'password': PASSWORD,
        }
        fetch(oauth_shop_url, {
            method: 'post',
            headers: {
                'Accept': 'application/vnd.api+json',
                //'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json',
                'mode': 'no-cors'
                //'X-CSRF-Token': result
            },
            body: JSON.stringify(data),
        }).then(
            (result) => result.json()
            //(result) => console.log(result.json())
        ).then(
            //data => console.log(data.shop)
            data => {
                //const register_url = SHOP_URL + API_USER_REGISTER + '?_format=json'
                //const register_url = SHOP_URL + API_USER_REGISTER
                const register_url = SHOP_URL + '/api/user-registration'

                console.log('reg data=', data.access_token)
                const body = JSON.stringify({
                    'username': username,
                    'mail': email,
                    'pass': password,
                });

                fetch(register_url, {
                    method: 'POST',
                    headers: {
                        'Access-Control-Allow-Origin': SHOP_URL,
                        //'Accept': 'application/vnd.api+json',
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': data.access_token,
                        //'mode': 'no-cors'
                    },
                    body: body,

                })
                    .then(response => response.json())
                    .then(data => {
                            console.log('Success', data);
                            if (data.status === 'Success') {
                                const login_current_user = {
                                    name: username,
                                    //mail: email,
                                    uid: data.uid,
                                }
                                localStorage.setItem('current_user', JSON.stringify(login_current_user));
                                setCurrent_user(login_current_user)
                                hideLogin(false)
                                setShowForm(false)
                            }
                        }
                    )
            })
    }


    const Logout = () => {
        setCurrent_user('')
        localStorage.removeItem('current_user')
    }

    useEffect(function () {
        // if (localStorage.getItem('current_user')) {
        //     const current_user = JSON.parse(localStorage.getItem('current_user'));
        //     setCurrent_user(current_user)
        // }
    }, []);

    return <div className="registerFormWrapper">
        {showForm ? (<div className='registerForm'>
            <div className="form-header"><i className="material-icons form-close" onClick={handleShowForm}>close</i>
            </div>
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
                : (<span className="currentUser"> Hello: <Link to="/user/">{current_user.name}</Link>
                        <div className="divider"></div> <a className="logout" href="#" onClick={Logout}>Logout</a> </span>)
        }
    </div>
    //}
}

export default RegisterForm;