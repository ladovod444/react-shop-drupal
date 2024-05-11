import { useEffect, useContext } from 'react';
import {ShopContext} from "../context";
function Cart(props) {
    const {
        order,
        handleBasketShow = Function.prototype
    } = useContext(ShopContext);
    //const {addToCart} = props;
    const quantity = order.reduce((sum, elem) => sum + elem.quantity, 0);
    return <div className='cart blue darken-4 white-text' onClick={handleBasketShow}>
        <i className='material-icons'>shopping_cart</i>
        { quantity ? <span className='cart-quantity'>{quantity}</span> : null}
    </div>
}

export default Cart;