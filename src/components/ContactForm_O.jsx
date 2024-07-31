import {useEffect, useState} from "react";
import {API_SEND_CONTACTS_FORM, API_USER, SHOP_URL} from "../config";
import {getOauth} from "../oauth";

function ContactForm(props) {

    const [header, setHeader] = useState('Hello Contact Page');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showName, setShowName] = useState(true);
    const [showSubmit, setShowSubmit] = useState(false);

    const {
        title = '',
        cb = Function.prototype
    } = props;

    const handleChange = (e)=> {
        //console.log(e.target.value)
        const input_value = e.target.value;
        const input_name = e.target.name;

        //console.log(email, message);
        // console.log('input_value=', input_value);
        // if (email && message) {
        //     setShowSubmit(true);
        // }


        switch (input_name) {
            case 'header':
                setHeader(input_value);
                break;
            case 'name':
                setName(input_value);
                break;
            case 'email':
                setEmail(input_value);
                break;
            case 'message':
                setMessage(input_value);
                break;
        }

    }

    useEffect(() => {
        const current_user = JSON.parse(localStorage.getItem('current_user'));
        //console.log(current_user);
        if (current_user) {
            setShowName(false);
            setName(current_user.name);
        }

        setShowSubmit(email && message && name)

        // if (email && message && name) {
        //     setShowSubmit(true);
        // }
        // else {
        //     setShowSubmit(false);
        // }

    }, [email, message, name]);

    const sendMessage = async (data) => {
        //console.log(data.access_token)
        //const current_user = JSON.parse(localStorage.getItem('current_user'));
        //console.log(current_user);

        //if (current_user) return;
        //const drupal_user_url = SHOP_URL + API_USER + current_user.uid;
        const drupal_send_contact_url = SHOP_URL + API_SEND_CONTACTS_FORM;
        console.log(drupal_send_contact_url);
        const body = JSON.stringify({
            // 'username': name,
            //             // 'mail': email,
            'subject': {value: name},
            'message': {value: message},
            'contact_form': 'react'
        });

        //console.log(body); return;

        const response = await fetch(drupal_send_contact_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + data.access_token
            },
            body: body
        });
        return await response.json();
    }

    const formSubmit = () => {
        getOauth().then(
            data => sendMessage(data)
        );
    }

    return <div>
        <h5>{title ? title : 'No title'}</h5>
        <input name="header" placeholder="Enter child header" onChange={handleChange} type="text"/>
        {showName ? <input name="name" placeholder="Enter name" onChange={handleChange} type="text"/> : ''}
        <input name="email" placeholder="Enter email" onChange={handleChange} type="text"/>
        <textarea name="message" placeholder="Enter message" onChange={handleChange}></textarea>
        <button className="submit" onClick={() => cb(header)}>Send</button>
        {showSubmit ? <button className="submit" onClick={formSubmit}>Send message</button> : ''}
        {/*<button className="submit" onClick={sendMessage}>Send message</button>*/}
    </div>
}

export default ContactForm