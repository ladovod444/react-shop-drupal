import {useParams, useNavigate} from "react-router-dom";
//import useHistory from
function Movie() {
    const {id, title} = useParams();
    const navigate = useNavigate();
    console.log(id, title)
    //console.log(goBack)
    return <>
        <h1>movie {title}</h1>
        <button className='btn' onClick={() => navigate(-1)}>
            Go Back Home
        </button>
    </>

}

export {Movie}