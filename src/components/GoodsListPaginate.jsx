import GoodsItem from "./GoodsItem";
function GoodsListPaginate({ currentItems }) {
    return (
        <div className="row">
            <div className="goods" >
            {currentItems &&
                currentItems.map((item) => (
                    <div>
                        <GoodsItem key={item.mainId} {...item}/>
                    </div>


                ))}
            </div>
        </div>
    );
}

export default GoodsListPaginate;