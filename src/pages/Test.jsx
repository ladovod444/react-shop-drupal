import {useState} from "react";

export default function Test() {
    const [sort, setSort] = useState(true);
    //const fruits = ["Апельсин", "Банан", "Яблоко"];
    const fruits = [
        { name: "Апельсин", id: "1" },
        { name: "Банан", id: "2" },
        { name: "Яблоко", id: "3" },
    ];
    const sortedFruits = sort ? [...fruits].sort() :
        [...fruits].sort().reverse();
    const sortOrder = () => setSort((sort) => !sort);
    return (
        <div>
            <button onClick={sortOrder}>Сортировка</button>
            <ul>
                {sortedFruits.map((fruit, index) => (

                    <li key={fruit.id}>
                        <p>
                            <label>
                                <input type="checkbox"/>
                                <span>{fruit.name}</span>
                            </label>
                        </p>
                    </li>
                    ))}
            </ul>
        </div>
    );
}