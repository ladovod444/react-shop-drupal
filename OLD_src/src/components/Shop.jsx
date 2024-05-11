import {useEffect, useState} from "react";
import {API_URL, API_KEY} from "../config";
import Preloader from "./Preloader";
import GoodsList from "./GoodsList";
import Cart from "./Cart";
import BasketList from "./BasketList";
import Alert from "./Alert";
function Shop() {

    const [goods, setGoods] = useState([])
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');
    const addToCart = (item) => {
        const itemIndex = order.findIndex(
            orderItem => orderItem.mainId === item.mainId
        )
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            }
            setOrder([...order, newItem])
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    }
                } else {
                    return orderItem;
                }
            })

            setOrder(newOrder)
        }
        setAlertName(item.displayName)
    }

    const removeFromCart = (mainId) => {
       const newOrder = order.filter(el => el.mainId !== mainId)
        setOrder(newOrder);
    }

    const increaseQuantity = (mainId) => {
        //console.log(item)
        const itemIndex = order.findIndex(
            orderItem => orderItem.mainId === mainId
        )

        const newOrder = order.map((orderItem, index) => {
            if (index === itemIndex) {
                return {
                    ...orderItem,
                    quantity: orderItem.quantity + 1,
                }
            } else {
                return orderItem;
            }
        })
        setOrder(newOrder);
    }

    const decreaseQuantity = (mainId) => {
        const itemIndex = order.findIndex(
            orderItem => orderItem.mainId === mainId
        )

        const newOrder = order.map((orderItem, index) => {
            if (index === itemIndex) {
                let quantity = orderItem.quantity > 1 ? orderItem.quantity - 1 : 1;
                return {
                    ...orderItem,
                    quantity: quantity,
                }
            } else {
                return orderItem;
            }
        })
        setOrder(newOrder);
    }

    const closeAlert = () => {
        setAlertName('');
    }

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow)
    }

    useEffect(function getGoods(){
        fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Authorization': API_KEY,
                },
            }).then(
            (result) => result.json()
        ).then(
            //data => console.log(data.shop)
            data => {
                setGoods(data.shop)
                //setGoods(data.shop)
                setLoading(false);
            }
        )


    }, []);

    return <main className="container content ">
        {/*<Cart quantity={order.length} addToCart={addToCart}  />*/}
        <Cart quantity={order.length} handleBasketShow={handleBasketShow}/>
        {
            //console.log('test')
           loading ? (
               <Preloader />
           ) : (
               <GoodsList goods = {goods} addToCart = {addToCart} />
           )}
        {isBasketShow &&
            (<BasketList
                order={order}
                handleBasketShow={handleBasketShow}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
            />
            )}
        {
          alertName && <Alert name={alertName} closeAlert={closeAlert} />
        }
    </main>
}

export default Shop