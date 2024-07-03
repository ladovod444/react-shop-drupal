import {useContext, useState} from "react";
import {ShopContext} from "../context";
import BasketItem from "./BasketItem";
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

    const [orderResults, setOrderResults] = useState([]);

    const handleOrderCreate = () => {

        const user = localStorage.getItem('current_user');
        const user_obj = user ? JSON.parse(user) : ''
        const data = {
            order: order,
            user_uid: user_obj ? user_obj.uid : '',
        }
        console.log(user);
        console.log('data = ', data);

        const drupal_shop_url =  'http://shop.local/api/shop-order-shoporderresource';
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

                <li className="collection-item ">
                    <button className="secondary-content btn-small" onClick={handleOrderCreate}>Оформить</button>
                </li>

            </ul>}


        <i className="material-icons basket-close" onClick={handleBasketShow}>close</i>
    </div>
}

export default BasketList