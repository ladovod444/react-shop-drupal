import {useEffect, useState} from "react";
import {
    API_CREATE_ORDER,
    API_PRODUCTS,
    API_USER,
    CLIENT_ID,
    CLIENT_SECRET,
    GRANT_TYPE,
    OAUTH_TOKEN_URL,
    PASSWORD,
    SCOPE,
    SHOP_URL,
    USERNAME
} from "../config";
import OrderItem from "../components/OrderItem";
import Order from "../components/Order";
import Preloader from "../components/Preloader";

function UserOrders() {
    const [orders, setOrders] = useState([]);

    const cancelOrder = (order_id) => {
        console.log(order_id)
        const newOrders = orders.filter(order =>
            order.order_id !== order_id
        )
        setOrders(newOrders)

        // Update order
        const data = {
            'grant_type': GRANT_TYPE,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'scope': SCOPE,
            'username': USERNAME,
            'password': PASSWORD,
        }

        const drupal_shop_url= SHOP_URL + API_CREATE_ORDER + '/' + order_id;


        fetch(drupal_shop_url, {
            method: 'PATCH',
            //method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + data.access_token

            },
            body: JSON.stringify({order_id: order_id} )

        }).then(response => response.json())
            .then(
                results => {
                    //setGoods(data)
                    //setOrderResults(results)
                    console.log(results)

                    // TODO проверять, если results.order_id
                    // if (results.order_id) {
                    //     handleBasketClear();
                    // }
                }
            )
        // fetch(oauth_shop_url, {
        //     method: 'post',
        //     headers: {
        //         'Accept': 'application/vnd.api+json',
        //         //'Content-Type': 'application/x-www-form-urlencoded',
        //         'Content-Type': 'application/json',
        //         'mode': 'no-cors'
        //         //'X-CSRF-Token': result
        //     },
        //     body: JSON.stringify(data),
        // }).then(
        //     (result) => result.json()
        //     //(result) => console.log(result.json())
        // ).then(
        //     //data => console.log(data.shop)
        //     data => {
        //         // FETCH DATA Using oauth access_token.
        //         console.log(data.access_token)
        //         const drupal_shop_url = SHOP_URL +  API_PRODUCTS;
        //         fetch(drupal_shop_url, {
        //             method: 'GET',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': 'Bearer ' + data.access_token
        //             },
        //
        //         }).then(
        //             (result) => result.json()
        //             //(result) => console.log(result.json())
        //         ).then(
        //             data => {
        //                 setGoods(data)
        //             }
        //         )
        //     }
        // ).catch((error) => {
        //     console.log(error)
        // });
    }

    useEffect(function () {
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
                // FETCH user DATA Using oauth access_token.
                console.log(data.access_token)
                const current_user = JSON.parse(localStorage.getItem('current_user'));
                console.log(current_user.uid);
                // api/v3/user/%user/orders
                const drupal_user_orders_url = SHOP_URL + '/api/v3/user/' + current_user.uid + '/orders';
                console.log(drupal_user_orders_url)
                fetch(drupal_user_orders_url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + data.access_token
                    },

                }).then(
                    (result) => result.json()
                    //(result) => console.log(result)
                ).then(
                    data => {
                        console.log(data)
                        setOrders(data)
                    }
                )
            }
        ).catch((error) => {
            console.log(error)
        });
    }, []);

    return <div className="container content"><h1>My orders</h1>
        {orders.length ? orders.map(order =>
            //<OrderItem key={order.order_id} {...order} />
            <Order key={order.order_id} {...order} cancelOrder={cancelOrder} />
        ) : <Preloader />

        }
    </div>
}

export default UserOrders