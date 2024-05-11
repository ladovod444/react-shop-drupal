import {useContext} from "react";
import {ShopContext} from "../context";
import GoodsItem from "./GoodsItem";

function GoodsList() {
    const {goods = []} = useContext(ShopContext);

    return <div className="row">
        <div className="goods" >
            {
                goods.map(item =>
                        // <div key={item.mainId}>test</div>
                    <GoodsItem
                        key={item.mainId} {...item}/>
                )
            }
            </div>
        </div>
}

export default GoodsList;