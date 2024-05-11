import {useContext} from "react";
import {ShopContext} from "../context";
import BasketItem from "./BasketItem";
function BasketList() {
    const {
        order = [],
        handleBasketShow = Function.prototype,
    } = useContext(ShopContext);
    const totalPrice = order.reduce((sum, elem) => {
        // return sum + elem.price.regularPrice * elem.quantity
        return sum + elem.price * elem.quantity
    }, 0)
    return <ul className="collection basket-list">
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
            <button className="secondary-content btn-small">Оформить</button>
        </li>
        <i className="material-icons basket-close" onClick={handleBasketShow}>close</i>
    </ul>
}

export default BasketList