import {useParams, useNavigate, json, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    API_USER,
    CLIENT_ID,
    CLIENT_SECRET,
    GRANT_TYPE,
    OAUTH_TOKEN_URL,
    PASSWORD,
    SCOPE,
    SHOP_URL,
    USERNAME
} from "../config";
import Preloader from "../components/Preloader";

//import useHistory from
function UserPage() {
    //const {id} = useParams();
    const navigate = useNavigate();
    //console.log(id)

    const [user, setUser] = useState([]);

    useEffect(function getGood() {

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
                // FETCH user DATA Using oauth access_token.
                console.log(data.access_token)
                const current_user = JSON.parse(localStorage.getItem('current_user'));
                console.log(current_user.uid);
                const drupal_user_url = SHOP_URL + API_USER + current_user.uid;
                // console.log('drupal_shop_url =' + drupal_shop_url)
                fetch(drupal_user_url, {
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
                        setUser(data)
                        //
                    }
                )
            }
        ).catch((error) => {
            console.log(error)
        });
    }, [])

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