import React, {useContext, useState} from "react";
import {ShopContext} from "../context";
import BasketItem from "./BasketItem";
import {API_CREATE_ORDER, SHOP_URL} from "../config";
import Button from "@mui/material/Button";
function BasketList() {
    let {
        order = [],
        handleBasketShow = Function.prototype,
        handleBasketClear = Function.prototype,
    } = useContext(ShopContext);
    const totalPrice = order.reduce((sum, elem) => {
        // return sum + elem.price.regularPrice * elem.quantity
        return sum + elem.price * elem.quantity
    }, 0)

    const current_user = localStorage.getItem('current_user');
    //console.log(current_user);

    const [orderResults, setOrderResults] = useState([]);
    const [email, setEmail] = useState('');
    const [isValidMail, setIsValidMail] = useState(false);

    const validateMail = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return false;
            //alert('You have entered invalid email');
        }
    }
    const handleChange = (event) => {
        //console.log(event.target.value)
        const input_value = event.target.value;
        // eslint-disable-next-line default-case
        switch (event.target.name) {
            case 'email':
                const email_check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input_value)
                console.log('email_check = ', email_check);
                setEmail(input_value);
                // if (validateMail(input_value)) {
                //     setEmail(input_value);
                // }
                if (email_check) {
                    setIsValidMail(true);
                }
                else {
                    setIsValidMail(false)
                }
                break;
        }
    }

    const handleOrderCreate = () => {
        const user = localStorage.getItem('current_user');
        const user_obj = user ? JSON.parse(user) : ''
        const data = {
            order: order,
            user_uid: user_obj ? user_obj.uid : '',
            mail: email ? email : '',
        }
        console.log(user);
        console.log('data = ', data);

        const drupal_shop_url= SHOP_URL + API_CREATE_ORDER;
        fetch(drupal_shop_url, {
            method: 'POST',
            //method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + data.access_token

            },
            body: JSON.stringify( data )

        }).then(response => response.json())
          .then(
            results => {
                //setGoods(data)
                setOrderResults(results)
                console.log(results)

                // TODO проверять, если results.order_id
                if (results.order_id) {
                    handleBasketClear();
                }
            }
        )

        // TODO send request to createOrderApi
    }

    return <div className="basket-list">

        {orderResults.order_id ?
            <div className="order-results">
                <div className="results-header"></div>
                <h4>Successfully created!</h4>
                <a href={`/orders/track/${orderResults.order_id}`}>Track you order</a>
            </div> :
            <ul className="collection">
                <li className="collection-item active">
                    Корзина
                </li>
                {
                    order.length ? order.map(item => (
                            <BasketItem
                                key={item.mainId}
                                {...item}
                            />)) :
                        <li className="collection-item">Корзина пуста</li>
                }
                <li className="collection-item ">Общая стоимость: {totalPrice} r.</li>

                { !current_user ?
                    <li className="collection-item ">
                        <input
                            type="email"
                            placeholder="Please provide your email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            onBlur={validateMail}
                        />
                    </li> : ''
                }

                {/*{ current_user || (email && validateMail(email)) ?*/}
                { current_user || (email && isValidMail) ?
                <li className="collection-item create-order">
                    {/*<button className="secondary-content btn-small" onClick={handleOrderCreate}>Оформить</button>*/}
                    <Button onClick={handleOrderCreate} variant="contained">Create order</Button>
                </li> : ''
                }

            </ul>}

        <i className="material-icons basket-close" onClick={handleBasketShow}>close</i>
    </div>
}

export default BasketList