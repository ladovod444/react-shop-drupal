import {useParams, useNavigate, json} from "react-router-dom";
import {useEffect, useState} from "react";
import {CLIENT_ID, CLIENT_SECRET, GRANT_TYPE, PASSWORD, SCOPE, USERNAME} from "../config";
import Preloader from "../components/Preloader";

//import useHistory from
function UserPage() {
    //const {id} = useParams();
    const navigate = useNavigate();
    //console.log(id)

    const [user, setUser] = useState([]);

    useEffect(function getGood() {

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
                // FETCH user DATA Using oauth access_token.
                console.log(data.access_token)
                const current_user = JSON.parse(localStorage.getItem('current_user'));
                console.log(current_user.uid);
                const drupal_user_url = 'http://shop.local/api/v3/users/' + current_user.uid;
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
        const url = 'http://shop.local/' + picture;
        return <>
            <div className="product-page card" id='test'>
                <div className="card-image user-image">
                    <img src={url} alt='test'/>
                    <span className="card-title">{name}</span><br/>
                    <span className="card-email">{email}</span>

                </div>
                <div className="card-content">
                    <p>
                    </p>
                </div>
                <div className="card-action">

                    <span className="right" style={{fontSize: ' 1.8rem'}}> r.</span>
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