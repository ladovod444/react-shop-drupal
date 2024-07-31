import {useEffect, useState} from "react";
import {
    API_CREATE_ORDER,
    CLIENT_ID,
    CLIENT_SECRET,
    GRANT_TYPE,
    PASSWORD,
    SCOPE,
    SHOP_URL,
    USERNAME
} from "../config";
import Order from "../components/Order";
import Preloader from "../components/Preloader";
import {getOauth} from "../oauth";

function UserOrders() {
    const [orders, setOrders] = useState([]);

    const current_user = JSON.parse(localStorage.getItem('current_user'))

    const cancelOrder = (order_id) => {
        console.log(order_id)
        const newOrders = orders.filter(order =>
            order.order_id !== order_id
        )
        setOrders(newOrders)

        // Update order
        // const data = {
        //     'grant_type': GRANT_TYPE,
        //     'client_id': CLIENT_ID,
        //     'client_secret': CLIENT_SECRET,
        //     'scope': SCOPE,
        //     'username': USERNAME,
        //     'password': PASSWORD,
        // }

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
    }
    const getUserOrders = async (data) => {
        console.log(data.access_token)
        const current_user = JSON.parse(localStorage.getItem('current_user'));
        // console.log(current_user);
        // console.log(current_user.uid);

        const drupal_user_orders_url = SHOP_URL + '/api/v3/user/' + current_user.uid + '/orders';
        console.log(drupal_user_orders_url)
        const response = await fetch(drupal_user_orders_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + data.access_token
            },
        });
        return await response.json();
    }
    useEffect(() => {
        if (current_user) {
            getOauth().then(
                data => {
                    getUserOrders(data).then(
                        data => {
                            setOrders(data)
                        }
                    )

                }
            )
        }

    }, []);

    return <div className="container content"><h1>My orders</h1>
        {current_user && orders.length ? orders.map(order =>
            //<OrderItem key={order.order_id} {...order} />
            <Order key={order.order_id} {...order} cancelOrder={cancelOrder} />
        ) : <Preloader />


        }
    </div>
}

export default UserOrders