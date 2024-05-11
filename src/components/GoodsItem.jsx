import {useContext} from "react";
import {ContextProvider, ShopContext} from "../context";

function GoodsItem(props) {
    const {
        mainId,
        displayName,
        displayDescription,
        price,
        displayAssets,
    } = props;

    const {addToCart} = useContext(ShopContext);

    const url = 'http://shop.local/' + displayAssets;
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
        <div className="card-action">
            <button className='btn' onClick={() => addToCart({
                mainId,
                displayName,
                price
            })
            }>Купить</button>
            {/*<span className="right" style={{fontSize:' 1.8rem'}}>{price.regularPrice} r.</span>*/}
            {/*<span className="right" style={{fontSize:' 1.8rem'}}>{price} r.</span>*/}
            <span className="right" style={{fontSize:' 1.8rem'}}>{formated_price} r.</span>
        </div>
    </div>
}

export default GoodsItem