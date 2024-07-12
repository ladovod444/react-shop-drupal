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
        const response = await fetch(SHOP_URL + API_PRODUCTS, {
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
        if (str && str.length >=3) {
            console.log('goods=', goods); //return
            console.log('str=', str); //return
            setFilteredGoods(
                goods.filter(item =>
                    item.displayName.toLowerCase().includes(str.toLowerCase())
                )
            )
            navigate({
                pathname,
                search: `?search=${str}`
            });
       }
        else {
            getOauth().then(
                data => {
                    //console.log(data)
                    getAllGoods(data).then(
                        data => {
                            setGoods(data)
                            setFilteredGoods(data)
                        }
                    )
                }
            )

            navigate({
                pathname,
                //search: `?search=${str}`
            });
        }
    }

    useEffect(() => {
        getOauth().then(
            data => {
                //console.log(data)
                getAllGoods(data).then(
                    data => {
                        setGoods(data)

                        setFilteredGoods(search ?
                            data.filter(item =>
                                item.displayName
                                    .toLowerCase()
                                    .includes(search.split('=')[1].toLowerCase())
                            ) : data);
                    }
                )

            }
        )

    }, [search]);

    return <main className="container content">
        {loading ? (
            <Preloader/>
        ) : (
            <>
                {/*<Search cb={handleSearch}/>*/}
                {/*<PaginatedItems itemsPerPage={12} goods={goods}/>*/}
                <PaginatedItems itemsPerPage={10} goods={filteredGoods} search={search}/>
            </>
        )}
    </main>
}

export default Shop