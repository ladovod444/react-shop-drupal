import {useEffect, useContext, useState} from "react";
import {ShopContext} from "../context";
import {SHOP_URL, API_PRODUCTS} from "../config";
import Preloader from "./Preloader";
import PaginatedItems from "./PaginatedItems"
import Search from "./Search";
import {useLocation, useNavigate} from "react-router-dom";
import {getOauth} from "../oauth";

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
        //if (str && str.length >=3) {
           // console.log('goods=', goods); //return
           // console.log('str=', str); //return
            setFilteredGoods(
                goods.filter(item =>
                    item.displayName.toLowerCase().includes(str.toLowerCase())
                )
            )
            navigate({
                pathname,
                search: `?search=${str}`
            });
       //}
        // else {
        //     getOauth().then(
        //         data => {
        //             //console.log(data)
        //             getAllGoods(data).then(
        //                 data => {
        //                     setGoods(data)
        //                     setFilteredGoods(data)
        //                 }
        //             )
        //         }
        //     )
        //
        //     navigate({
        //         pathname,
        //         //search: `?search=${str}`
        //     });
        // }
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
                <Search cb={handleSearch}/>
                {/*<PaginatedItems itemsPerPage={12} goods={goods}/>*/}
                <PaginatedItems itemsPerPage={12} goods={filteredGoods} search={search}/>
            </>
        )}
    </main>
}

export default Shop