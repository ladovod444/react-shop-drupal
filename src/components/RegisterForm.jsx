import React from "react";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {SHOP_URL} from "../config";
import {getOauth} from "../oauth";

function RegisterForm({hideLogin}) {

    let user = ''
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showForm, setShowForm] = useState('');
    const [current_user, setCurrent_user] = useState(user);

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

    const registerUser = async (data) => {
        const register_url = SHOP_URL + '/api/user-registration'
        console.log('reg data=', data.access_token)
        const response = await fetch(register_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + data.access_token
            },
            body:JSON.stringify({
                'username': username,
                'mail': email,
                'pass': password,
            }),
        });
        return await response.json();
    }

    const handleRegister = () => {
        getOauth().then(
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

                registerUser(data).then(
                    data => {
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
            }
        )
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
                        <div className="divider"></div> <a className="logout" href="#"
                                                           onClick={Logout}>Logout</a> </span>)
        }
    </div>
    //}
}

export default RegisterForm;