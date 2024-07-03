import {useEffect, useContext} from "react";
import {ShopContext} from "../context";
import {GRANT_TYPE, CLIENT_ID, CLIENT_SECRET, SCOPE, USERNAME, PASSWORD} from "../config";
import Preloader from "./Preloader";
import PaginatedItems from "./PaginatedItems"
function Shop() {

    const {
        goods,
        loading,
        order,
        setGoods} = useContext(ShopContext);
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

    }, []);

    return <main className="container content ">
        {
           loading ? (
               <Preloader />
           ) : (
            <PaginatedItems itemsPerPage={12} goods={goods} />

           )}

    </main>
}

export default Shop