function GoodsItem(props) {
    const {
        mainId,
        displayName,
        displayDescription,
        price,
        displayAssets,
        addToCart = Function.prototype
    } = props

    return <div className="card" id={mainId}>
        <div className="card-image">
            <img src={displayAssets[0].url} alt={displayName}/>
            <span className="card-title">{displayName}</span>

        </div>
        <div className="card-content">
            <p>{displayDescription}</p>
        </div>
        <div className="card-action">
            <button className='btn' onClick={() => addToCart({
                mainId,
                displayName,
                price
            })
            }>Купить</button>
            <span className="right" style={{fontSize:' 1.8rem'}}>{price.regularPrice} r.</span>
        </div>
    </div>
}

export default GoodsItem