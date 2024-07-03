import BasketItem from "./BasketItem";
function BasketList(props) {
    const {order = [],
        handleBasketShow = Function.prototype,
        removeFromCart = Function.prototype,
        increaseQuantity = Function.prototype,
        decreaseQuantity = Function.prototype
    } = props;
    const totalPrice = order.reduce((sum, elem) => {
        return sum + elem.price.regularPrice * elem.quantity
    }, 0)

    const handleOrderCreate = () => {
        console.log(order);
    }

    return <ul className="collection basket-list">
        <li className="collection-item active">
            Корзина
        </li>
        {
            order.length ? order.map(item => (
                    <BasketItem
                        key={item.mainId}
                        removeFromCart={removeFromCart}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        {...item}
                    />)) :
                <li className="collection-item">Корзина пуста</li>
        }
        <li className="collection-item ">Общая стоимость: {totalPrice} r.</li>

        <li className="collection-item ">
            <button className="secondary-content btn-small" onClick={handleOrderCreate}>Оформить</button>
        </li>
        <i className="material-icons basket-close" onClick={handleBasketShow}>close</i>
    </ul>
}

export default BasketList