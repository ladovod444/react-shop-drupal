import {useContext} from "react";
import {ContextProvider, ShopContext} from "../context";
import {Link} from "react-router-dom";
import {SHOP_URL} from "../config";
import Button from "@mui/material/Button";

function GoodsItem(props) {
    const {
        variation_id,
        mainId,
        displayName,
        displayDescription,
        price,
        displayAssets,
    } = props;

    const {addToCart} = useContext(ShopContext);

    const url = SHOP_URL +  '/' + displayAssets;
    const formated_price = parseInt(price);

    return <div className="card" id={mainId}>
        <div className="card-image">
            {/*<img src={displayAssets[0].url} alt={displayName}/>*/}
            <img src={url} alt={displayName}/>
            <span className="card-title">{displayName}</span>

        </div>
        <div className="card-content">
            <p>{displayDescription}</p>
        </div>
        <div className="card-content">
            <p><Link to={`/product/${mainId}`}>Show more</Link> </p>
        </div>
        <div className="card-action">

            <Button onClick={() => addToCart({
                variation_id,
                mainId,
                displayName,
                price
            })} variant="contained">Add to cart</Button>

            {/*<button className='btn' onClick={() => addToCart({*/}
            {/*    variation_id,*/}
            {/*    mainId,*/}
            {/*    displayName,*/}
            {/*    price*/}
            {/*})*/}
            {/*}>Купить*/}
            {/*</button>*/}
            {/*<span className="right" style={{fontSize:' 1.8rem'}}>{price.regularPrice} r.</span>*/}
            {/*<span className="right" style={{fontSize:' 1.8rem'}}>{price} r.</span>*/}
            <span className="right" style={{fontSize: ' 1.8rem'}}>{formated_price} r.</span>
        </div>
    </div>
}

export default GoodsItem