import {CLIENT_ID, CLIENT_SECRET, GRANT_TYPE, OAUTH_TOKEN_URL, PASSWORD, SCOPE, SHOP_URL, USERNAME} from "./config";

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

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return await response.json();

    //return await response.json();
}

export {getOauth}