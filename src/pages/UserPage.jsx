import {useParams, useNavigate, json, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    API_USER,
    SHOP_URL
} from "../config";
import Preloader from "../components/Preloader";
import {getOauth} from "../oauth";

//import useHistory from
function UserPage() {
    //const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    const getUser = async (data) => {
        //console.log(data.access_token)
        const current_user = JSON.parse(localStorage.getItem('current_user'));
        //console.log(current_user.uid);
        const drupal_user_url = SHOP_URL + API_USER + current_user.uid;
        const response = await fetch(drupal_user_url, {
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
                //console.log(data)
                getUser(data).then(
                    data => {
                        setUser(data)
                    }
                )

            }
        )

    }, []);

    if (user.length) {
        const {
            name,
            uid,
            email,
            picture
        } = user[0]
        const url = SHOP_URL + '/' + picture;
        return <>
            <div className="user-page card container content" id='test'>
                <div className="user-image">
                    <img src={url} alt='test'/>
                    <p>
                        <span className="card-title">{name}</span><br/>
                        <span className="card-email">{email}</span>

                        {/*http://localhost:3001/orders/track/26*/}
                    </p>

                </div>
                <div className="card-content">
                    <p>
                        <Link to='/orders'>My orders</Link>
                    </p>
                </div>

                <button className='btn' onClick={() => navigate(-1)}>
                    To Main page
                </button>
            </div>
        </>
    } else {
        return <>
            <div className='product-not-found'><Preloader/></div>
        </>
    }

}

export {UserPage}