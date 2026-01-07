import style from "../../component/style/checkOut/itemInfo.module.css"
function ItemInfo({handleOrdered, total, deleveryFees, cart, sub_Total, isEditing}) {
    return (
        <>
            <div className={style.container}>
                <h1 className={style.title}>Cash Payment</h1>
                <div className={style.items}>
                    <div className={style.item}>
                        <p className={style.text}>Item Total: <span className={style.span}>({cart.length})</span></p>
                        <p className={style.value}>GH$ {sub_Total}</p>
                    </div>
                    <div className={style.item}>
                        <p className={style.text}>Delevery fees</p>
                        <p className={style.value}>GHS {deleveryFees}</p>
                    </div>
                    <hr />
                    <div className={style.item}>
                        <p className={style.text}>Total: </p>
                        <p className={style.value}>GHS {total}</p>
                    </div>
                </div>
                <div className={`${style.btnBox} ${isEditing ? "cursor-not-allowed" :""}`}>
                    <button type="button" disabled={isEditing} onClick={handleOrdered} className={`${style.btn} ${isEditing ? "cursor-not-allowed" :""}`} >Pay in Cash </button>
                </div>
            </div>
        </>
    )
}
export default ItemInfo