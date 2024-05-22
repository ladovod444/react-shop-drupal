import {useEffect, useContext} from "react";
import {ShopContext} from "../context";
import {GRANT_TYPE, CLIENT_ID, CLIENT_SECRET, SCOPE, USERNAME, PASSWORD} from "../config";
import Preloader from "./Preloader";
import GoodsList from "./GoodsList";
import Cart from "./Cart";
import BasketList from "./BasketList";
import Alert from "./Alert";
import PaginatedItems from "./PaginatedItems"
function Shop() {

    const {
        goods,
        loading,
        order,
        isBasketShow,
        alertName,
        setGoods} = useContext(ShopContext);

    //const [goods, setGoods] = useState([])

    useEffect(function getGoods(){
        // TODO
        //const drupal_shop_url =  'http://shop.local/jsonapi/commerce_product/default';
        //const drupal_shop_url =  'http://shop.local/jsonapi/commerce_product_variation/default';
        const oauth_shop_url =  'http://shop.local/oauth/token';

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
                const drupal_shop_url =  'http://shop.local/api/v2/products';
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
                        setGoods(data)
                    }
                )
            }
        ).catch((error) => {
            console.log(error)
        });


        // const drupal_shop_url =  'http://shop.local/api/v1/products';
        // fetch(API_URL, {
        //         method: 'GET',
        //         headers: {
        //             'Authorization': API_KEY,
        //         },
        //     }).then(
        //     (result) => result.json()
        // ).then(
        //     //data => console.log(data.shop)
        //     data => {
        //         setGoods(data.shop)
        //         //setGoods(data.shop)
        //         //setLoading(false);
        //     }
        // )


    }, []);

    return <main className="container content ">
        {/*<Cart quantity={order.length} addToCart={addToCart}  />*/}
        <Cart quantity={order.length}/>
        {
           loading ? (
               <Preloader />
           ) : (
               // <GoodsList />
            <PaginatedItems itemsPerPage={12} goods={goods} />

           )}
        {isBasketShow &&
            (<BasketList/>
            )}
        {
          alertName && <Alert />
        }

    </main>
}

export default Shop