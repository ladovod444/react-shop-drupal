import {useEffect, useContext, useState} from "react";
import {ShopContext} from "../context";
import {
    GRANT_TYPE,
    CLIENT_ID,
    CLIENT_SECRET,
    SCOPE,
    USERNAME,
    PASSWORD,
    SHOP_URL,
    OAUTH_TOKEN_URL,
    API_PRODUCTS
} from "../config";
import Preloader from "./Preloader";
import PaginatedItems from "./PaginatedItems"
import Search from "./Search";
import {useLocation, useNavigate} from "react-router-dom";

function Shop() {
    const {
        goods,
        loading,
        order,
        setGoods
    } = useContext(ShopContext);

    const [filteredGoods, setFilteredGoods] = useState([])

    const {pathname, search} = useLocation();
    let navigate = useNavigate();

    const getOauth = async () => {
        const data = {
            'grant_type': GRANT_TYPE,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'scope': SCOPE,
            'username': USERNAME,
            'password': PASSWORD,
        }

        const response = await fetch(SHOP_URL + OAUTH_TOKEN_URL, {
            method: 'post',
            headers: {
                'Accept': 'application/vnd.api+json',
                //'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json',
                'mode': 'no-cors'
                //'X-CSRF-Token': result
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    }

    const getAllGoods = async (data) => {
        //console.log(SHOP_URL + API_PRODUCTS);
        //console.log(data); return;
        const response = await fetch(SHOP_URL + API_PRODUCTS,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + data.access_token
            },
        });
        return await response.json();
    }

    // Search
    const handleSearch = (str) => {
        if (str) {
            console.log('goods=', goods); //return
            console.log('str=', str); //return
            setGoods(
                goods.filter(item =>
                    item.displayName.toLowerCase().includes(str.toLowerCase())
                )
            )
            navigate({
                pathname,
                search: `?search=${str}`
            });
            //}
            //else {
            // getAllCategories().then(data => {
            //     //console.log(data);
            //     setCatalog(data.categories);
            //     setFilteredCatalog(data.categories);
            // })
        }
    }

    useEffect(

        //function getGoods() {
        () =>{

            getOauth().then(
                data => {
                     console.log(data)
                    getAllGoods(data).then(
                        //data_prods =>
                        //console.log('gg==', data_prods)
                       goods => setGoods(goods)
                    )
                }
            )
        // TODO
        //const drupal_shop_url =  'http://shop.local/jsonapi/commerce_product/default';
        //const drupal_shop_url =  'http://shop.local/jsonapi/commerce_product_variation/default';

        /*
        const oauth_shop_url = SHOP_URL + OAUTH_TOKEN_URL;

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
                const drupal_shop_url = SHOP_URL + API_PRODUCTS;
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

        */

    }, [goods]);

    return <main className="container content">
        {loading ? (
            <Preloader/>
        ) : (
            <>
                <Search cb={handleSearch}/>
                <PaginatedItems itemsPerPage={12} goods={goods}/>
            </>
        )}
    </main>
}

export default Shop