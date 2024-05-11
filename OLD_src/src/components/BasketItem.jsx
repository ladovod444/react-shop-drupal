function BasketItem(props) {
    const {
        mainId,
        displayName,
        price,
        quantity,
        removeFromCart = Function.prototype,
        increaseQuantity = Function.prototype,
        decreaseQuantity = Function.prototype

    } = props
    return <li className="collection-item">
        {displayName}
        <i className="material-icons basket-increase" onClick={() => increaseQuantity(mainId)}>add</i>
        <i className="material-icons basket-decrease" onClick={() => decreaseQuantity(mainId)}>remove</i>
        x {quantity} = {price.regularPrice * quantity} r.

        <span className="secondary-content" onClick={() => removeFromCart(mainId)}>
            <i className="material-icons basket-delete">close</i>
        </span>


    </li>
}

export default BasketItem