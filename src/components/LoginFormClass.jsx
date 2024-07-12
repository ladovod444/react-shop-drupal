import React, {Component, useContext} from "react";
import {Link} from "react-router-dom";
import {SHOP_URL} from "../config";

import {ShopContext} from "../context";

class LoginForm extends Component {

    //const {order, isBasketShow, alertName} = useContext(ShopContext);
    // constructor(props) {
    //     super();
    //     //props.hideRegister
    // }
    state = {
        username: '',
        email: '',
        password: '',
        showForm: false,
        current_user: false,
        statusMessage: ''
    }

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({[event.target.name]: event.target.value})
    }

    handleshowForm = (event) => {
        this.setState({showForm: !this.state.showForm})
    }

    handleLogin = () => {
        const csrfToken = 'test';
        const username = this.state.username
        const password = this.state.password

        // https://www.drupalchamp.org/blog/user-login-rest-api-drupal8
        const login_url = SHOP_URL + '/user/login?_format=json'
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
                    console.log('Success', data);
                    if (data.current_user) {
                        localStorage.setItem('current_user', JSON.stringify(data.current_user));
                        this.setState({current_user: data.current_user, showForm: false})
                        this.props.hideRegister(false)
                        loginUser(data.current_user.username)
                    }
                    else {
                        console.log(data.message)
                        this.setState({statusMessage: data.message})
                    }
                }
            );
    }

    validateName = () => {
        if (this.state.username.length < 5) {
            //alert('Your first name can\'t be less then 5 letters');
        }
    }

    validateMail = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email)) {
            // return true;
            //alert('You have entered invalid email');
        }
    }

    validatePassword = () => {
        if (this.state.password.length < 3) {
            //alert('Your password can\'t be less then 3 letters');
        }
    }

    Logout = () => {
        this.setState({current_user: ''})
        localStorage.removeItem('current_user')
        this.props.hideRegister(true)
    }

    componentDidMount() {
        if (localStorage.getItem('current_user')) {
            const current_user = JSON.parse(localStorage.getItem('current_user'));
            this.setState({current_user: current_user})
        }
    }

    render() {
        const {username, email, password, showForm, current_user, statusMessage} = this.state;
        return <div className="loginFormWrapper">
            {showForm ? (<div className='loginForm'>

                <div className="form-header"><i className="material-icons form-close" onClick={this.handleshowForm}>close</i></div>
                <div className="form-inputs">
                    <div className="login-status">{statusMessage}</div>
                    <input
                        type="text"
                        placeholder="username"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                        onBlur={this.validateName}
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
                        onChange={this.handleChange}
                        onBlur={this.validatePassword}
                    />
                    <button className="secondary-content btn-small" onClick={this.handleLogin}>Login</button>
                </div>
            </div>) : ''}
            {
                !current_user && !current_user.name ? (
                        <a className="toggleLoginForm" href="#" onClick={this.handleshowForm}>Login</a>)
                    : (<span className="currentUser"> Hello: <Link className="user-page-link" to="/user/">{current_user.name}</Link>
                        <div className="divider"></div> <a className="logout" href="#" onClick={this.Logout}>Logout</a> </span>)
            }
        </div>
    }
}

export default LoginForm;