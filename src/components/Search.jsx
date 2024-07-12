import {useState} from "react";
import {useLocation} from "react-router-dom";


function Search({cb = Function.prototype}) {

    const {pathname, search} = useLocation();
    const [value, setValue] = useState(search ? search.split('=')[1].toLowerCase() : '');

    //const search_str = search ? search.split('=')[1].toLowerCase() : ''

    const handleKey = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
        else {
            let val = e.target.value;
            //if (val.length >= 3) {
            handleSubmit();
            //}
        }
    }

    const handleSubmit = () => {
        //console.log(value);
        cb(value)
    }

    return <div className="row">
        <div className="input-field col s12">
            <input
                type="search"
                id="search-field"
                placeholder="search"
                onKeyDown={handleKey}
                onKeyUp={handleKey}
                onChange={(e) => setValue(e.target.value)}
                value={value}
            />
            <button
                className="btn"
                style={{
                    position:"absolute",
                    top: 0,
                    right: 0,
                }}
                onClick={handleSubmit}
            >Search</button>
        </div>
    </div>
}

export default Search