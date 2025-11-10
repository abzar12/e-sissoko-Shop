import React from "react";
import Button from "../Button/button";
import "./ProductCard.css"
import { Link } from "react-router-dom";
import { IoMdHelpCircle } from "react-icons/io";
function ProductCard({ title, Products, auth, ac_ItemClass, titleClass, Icon }) {
    return (
        <>
            <div className="">
                <h1 className={`title ${titleClass}` }> {Icon} {title}</h1>
                <div className={`ac_Items ${ac_ItemClass}`}>
                    {
                        Products.map((prod, index) => (
                            <div key={index} className="items">
                                <div className="card-image">
                                    {
                                        prod.Image_Name
                                            ?
                                            <Link to={`/product/product-detail?${prod.Id_phone}`}>
                                                <img src={`http://localhost:5330/public/img/${prod.Image_Name}`} alt={prod.Image} />
                                            </Link>
                                            :
                                            <div className="Image_Erro w-full h-full flex items-center justify-center bg-gray-100">
                                                <IoMdHelpCircle className="text-gray-400 w-16 h-16" />
                                            </div>
                                    }

                                </div>
                                <div className="ac_textItem">
                                    <p className="Prod-title">{prod.Name}</p>
                                    {/* <p className="desc">{prod.Description}</p> */}
                                    <p className="price"><span> Price: </span>{prod.Promot_Price ? prod.Promot_Price : prod.Price} GHS </p>
                                    <p className="price"> <span className="special">{prod.Promot_Price ? prod.Price + " GHS" : ""} </span></p>
                                    {
                                        (prod.Promot_Price || prod.Promot_Price < 0) && (
                                            <div className="PromoContent">
                                                <h1>Promotion</h1>
                                            </div>
                                        )
                                    }

                                </div>
                                <div className="card_btn">
                                    <Link to={auth ? `/product/edit-product?Id=${prod.Id_phone}` : `/shop/product-detail?Id=${prod.Id_phone}`} >
                                        <Button type="button"  children= {auth ? "Edit Product" : "Add to Cart"} />
                                    </Link>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </>
    )
}
export default ProductCard;