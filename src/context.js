import {createContext, useReducer} from "react";
import {reducer} from "./reducer";

export const ShopContext = createContext();

const initialState = {
    goods: [],
    loading: true,
    order: [],
    isBasketShow: false,
    alertName: '',
}
export const ContextProvider = ({children}) => {

    const [value, dispatch] = useReducer(reducer, initialState)
    value.closeAlert = () => {
        dispatch({type: 'CLOSE_ALERT'});
    }
    value.removeFromCart = (itemId) => {
        dispatch({type: 'REMOVE_FROM_CART', payload: {id: itemId}});
    }

    value.addToCart = (item) => {
        dispatch({type: 'ADD_TO_CART', payload: item});
    }

    value.increaseQuantity = (itemId) => {
        dispatch({type: 'INCREMENT_QUANTITY', payload: {id: itemId}});
    }

    value.decreaseQuantity = (itemId) => {
        dispatch({type: 'DECREMENT_QUANTITY', payload: {id: itemId}});
    }

    value.handleBasketShow = () => {
        dispatch({type: 'TOGGLE_BASKET'});
    }

    value.handleBasketClear = () => {
        dispatch({type: 'CLEAR_CART'});
    }

    value.setGoods = (data) => {
        dispatch({type: 'SET_GOODS', payload: data});
    }

    return <ShopContext.Provider value={value}>
        {children}
    </ShopContext.Provider>
}