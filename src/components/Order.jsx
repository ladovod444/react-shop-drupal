//import {useEffect, useContext, useState} from "react";
import OrderItem from "./OrderItem";

function Order(props) {
    const {
        order_id,
        state,
        //field_state,
        total_price,
        created,
        order_items_full = [],
        cancelOrder = Function.prototype
    } = props

    const dateTimeStr = new Date(created * 1000).toLocaleString()

    // const cancelOrder = (oid) => {
    //     //todo send remove/cancel request
    //
    // }

    return <div className="order_item">
        <h6>Order num. {order_id}</h6>
        <div className="order_info">
            Created: {dateTimeStr} <br/>
            {/*State: {state} <br/>*/}
            State: {state} <br/>
        </div>
        <div className="order_item_info">
            <table>
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
                </thead>
                <tbody>
                {order_items_full.map(order_item_full =>
                    <OrderItem key={order_item_full.oid} order_item_full={order_item_full}/>
                )}
                </tbody>
            </table>
            <p className="total-sum">Total sum: {total_price}</p>
        </div>
         {/*If state is new user can remove order*/}
        {state == 'New' ? <button onClick={() => cancelOrder(order_id)}>Cancel order</button> : '' }
    </div>
}

export default Order