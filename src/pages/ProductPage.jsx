import {useParams, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {API_PRODUCT, SHOP_URL} from "../config";
import Preloader from "../components/Preloader";
import {ShopContext} from "../context";
import {getOauth} from "../oauth";

//import useHistory from
function ProductPage() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState([]);
    const {addToCart} = useContext(ShopContext);

    const getProduct = async (data) => {
        //console.log(data.access_token)
        const drupal_shop_products_url = SHOP_URL + API_PRODUCT + id;
        const response = await fetch(drupal_shop_products_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + data.access_token
            },
        });
        return await response.json();
    }

    useEffect(() => {
        getOauth().then(
            data => {
                getProduct(data).then(
                    data => {
                        setProduct(data)
                    }
                )

            }
        )

    }, []);

    if (product.length) {
        const {
            mainId,
            displayName,
            displayDescription,
            price,
            displayAssets,
            //addToCart = Function.prototype
        } = product[0]
        const url = SHOP_URL + displayAssets;
        const formated_price = parseInt(price);
        return <>
            <div className="container content product-page card" id={mainId}>
                <div className="row">
                    <div className="card-image">
                        <img src={url} alt={displayName}/>
                        <span className="card-title">{displayName}</span>

                    </div>
                    <div className="card-content">
                        <p>{displayDescription ?
                            displayDescription : 'Еще нет описанния для этого товара'
                        }</p>
                    </div>
                    <div className="card-action">
                        <button className='btn'
                                onClick={() => addToCart({
                                    mainId,
                                    displayName,
                                    price
                                })
                                }
                        >Купить
                        </button>
                        <span className="right" style={{fontSize: ' 1.8rem'}}>{formated_price} r.</span>
                    </div>
                    <button className='btn' onClick={() => navigate(-1)}>
                        To all products
                    </button>
                </div>
            </div>
        </>
    } else {
        return <>
            <div className='product-not-found'><Preloader/></div>
        </>
    }

}

export {ProductPage}