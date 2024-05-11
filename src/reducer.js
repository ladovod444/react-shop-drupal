import alert from "./components/Alert";

export function reducer(state, {type, payload}) {
    switch (type) {
        case 'SET_GOODS': {
            return {
                ...state,
                goods: payload || [],
                loading: false
            }
        }
        case 'CLOSE_ALERT':
            return {
                ...state,
                alertName: ''
            }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                order: state.order.filter(el => el.mainId !== payload.id)
            }

        case 'ADD_TO_CART': {
            const itemIndex = state.order.findIndex(
                orderItem => orderItem.mainId === payload.mainId
            );
            let newOrder = null;
            if (itemIndex < 0) {
                const newItem = {
                    ...payload,
                    quantity: 1,
                }
                newOrder = [...state.order, newItem]
            } else {
                newOrder = state.order.map((orderItem, index) => {
                    if (index === itemIndex) {
                        return {
                            ...orderItem,
                            quantity: orderItem.quantity + 1,
                        }
                    } else {
                        return orderItem;
                    }
                })
            }

            return {
                ...state,
                order: newOrder,
                alertName: payload.displayName
            }
        }

        case 'INCREMENT_QUANTITY':
            return {
                ...state,
                order: state.order.map((el) => {
                    if (el.mainId === payload.id) {
                        return {
                            ...el,
                            quantity: el.quantity + 1,
                        }
                    } else {
                        return el;
                    }
                })
            }

        case 'DECREMENT_QUANTITY':
            return {
                ...state,
                order: state.order.map((el) => {
                    if (el.mainId === payload.id) {
                        return {
                            ...el,
                            quantity: el.quantity > 1 ? el.quantity - 1 : 1,
                        }
                    } else {
                        return el;
                    }
                })
            }

        case 'TOGGLE_BASKET':
            return {
                ...state,
                isBasketShow: !state.isBasketShow
            }

        default:
            return state;
    }
}