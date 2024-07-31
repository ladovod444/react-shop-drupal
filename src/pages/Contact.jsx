import ContactForm from "../components/ContactForm";
import {useState} from "react";

function Contact() {

    const [title, setTitle] = useState('Contact');
    const [header, setHeader] = useState('Contact page');

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const changeHeader = (value) => {
        setHeader(value)
    }

    return <div className="contactsForm">

        <h1>{header}</h1>
        {/*<input type="text" placeholder="Parent header" onChange={handleChange}/>*/}

        <ContactForm title={title} cb={changeHeader}/>
    </div>

}

export default Contact