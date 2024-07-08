function OrderItem(props) {
    const {
        order_item_full
    } = props
    return <tr>
        <td>{order_item_full.title}</td>
        <td>{parseInt(order_item_full.price.number)} {order_item_full.price.currency_code}</td>
        <td>{order_item_full.quantity}</td>
        <td>{parseInt(order_item_full.total_price.number)} {order_item_full.total_price.currency_code}</td>
    </tr>
}

export default OrderItem