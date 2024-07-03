import {useParams, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {CLIENT_ID, CLIENT_SECRET, GRANT_TYPE, PASSWORD, SCOPE, USERNAME} from "../config";
import Preloader from "../components/Preloader";
import {ShopContext} from "../context";

//import useHistory from
function ProductPage() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [good, setGood] = useState([]);
    const {addToCart} = useContext(ShopContext);

    useEffect(function getGood() {
        // TODO
        //const drupal_shop_url =  'http://shop.local/jsonapi/commerce_product/default';
        //const drupal_shop_url =  'http://shop.local/jsonapi/commerce_product_variation/default';
        const oauth_shop_url = 'http://shop.local/oauth/token';

        const data = {
            'grant_type': GRANT_TYPE,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'scope': SCOPE,
            'username': USERNAME,
            'password': PASSWORD,
        }
        fetch(oauth_shop_url, {
            method: 'post',
            headers: {
                'Accept': 'application/vnd.api+json',
                //'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json',
                'mode': 'no-cors'
                //'X-CSRF-Token': result
            },
            body: JSON.stringify(data),
        }).then(
            (result) => result.json()
            //(result) => console.log(result.json())
        ).then(
            //data => console.log(data.shop)
            data => {
                // FETCH DATA Using oauth access_token.
                console.log(data.access_token)
                const drupal_shop_url = 'http://shop.local/api/v3/products/' + id;
                console.log('drupal_shop_url =' + drupal_shop_url)
                fetch(drupal_shop_url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + data.access_token
                    },

                }).then(
                    (result) => result.json()
                    //(result) => console.log(result.json())
                ).then(
                    data => {
                        console.log(data)
                        setGood(data)
                        //
                    }
                )
            }
        ).catch((error) => {
            console.log(error)
        });
    }, [])

    if (good.length) {
        const {
            mainId,
            displayName,
            displayDescription,
            price,
            displayAssets,
            //addToCart = Function.prototype
        } = good[0]
        const url = 'http://shop.local/' + displayAssets;
        return <>
            <div className="container content product-page card" id={mainId}>
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
                    <span className="right" style={{fontSize: ' 1.8rem'}}>{price} r.</span>
                </div>
                <button className='btn' onClick={() => navigate(-1)}>
                    To all products
                </button>
            </div>
        </>
    } else {
        return <>
            <div className='product-not-found'><Preloader/></div>
        </>
    }

}

export {ProductPage}