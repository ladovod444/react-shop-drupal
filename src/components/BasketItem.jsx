import {useContext} from "react";
import {ShopContext} from "../context";
function BasketItem(props) {
    const {
        mainId,
        displayName,
        price,
        quantity,
        variation_id
    } = props

    const {removeFromCart, increaseQuantity, decreaseQuantity} = useContext(ShopContext);

    return <li className="collection-item">
        {displayName}
        <i className="material-icons basket-increase" onClick={() => increaseQuantity(mainId)}>add</i>
        <i className="material-icons basket-decrease" onClick={() => decreaseQuantity(mainId)}>remove</i>
        {/*x {quantity} = {price.regularPrice * quantity} r.*/}
        x {quantity} = {price * quantity} r.

        <span className="secondary-content" onClick={() => removeFromCart(mainId)}>
            <i className="material-icons basket-delete">close</i>
        </span>


    </li>
}

export default BasketItem