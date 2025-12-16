
const ProductInfo = ({ product }) => {
    if (!product) return null;

    const {
        Name,
        Brand,
        Category,
        Model,
        Color,
        Price,
        Promot_Price,
        Quantity,
        Delivery,
        Warranty,
        Contact_Email,
        Description,
    } = product;

    return (
        <div className="max-w-[950px] bg-white rounded-xl shadow-md p-6 space-y-6">

            {/* Product Title */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Specification of product</h1>
                    <ul className="text-sm text-gray-500 mt-1">
                        {Brand && (<li> <div className="rounded-full h-2 mb-[1px] w-2 bg-black inline-block"> </div> Brand: <span className="font-medium text-gray-700">{Brand}</span></li>)}
                        {Category && (<li> <div className="rounded-full h-2 mb-[1px] w-2 bg-black inline-block"> </div> Category: <span className="font-medium text-gray-700"> {Category}</span></li>)}
                    </ul>
            </div>

            {/* Stock Status */}
            <div className="">
                {Quantity > 0 ? (
                    <span className="inline-block px-3 py-1 text-xl bg-green-100 text-green-700 rounded-full">
                        In stock ({Quantity} available)
                    </span>
                ) : (
                    <span className="inline-block px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full">
                        Out of stock
                    </span>
                )}
            </div>
            {/* Product Details */}
            <div className="border text-gray-700 border-black rounded-lg p-3 max-w-[900px] flex flex-wrap md:grid md:grid-cols-2 gap-3 justify-around">
                <div className="">
                    <h3 className="font-semibold pl-3 mb-2 rounded-sm border-b bg-[var(--bg-color)] text-white  ">Product Detail : </h3>
                    <div className="ml-3">
                        {Color && <p><span className="font-medium">Color:</span> {Color}</p>}
                        {Model && <p><span className="font-medium">Model:</span> {Model}</p>}
                        {Warranty && <p><span className="font-medium">Warranty:</span> {Warranty}</p>}
                        {Delivery && <p><span className="font-medium">Delivery:</span> {Delivery}</p>}
                    </div>
                </div>

                {/* Description */}
                {Description && (
                    <div className="">
                        <h3 className="font-semibold pl-3 mb-2 rounded-sm border-b bg-[var(--bg-color)] text-white  ">Description: </h3>
                        <p className="text-gray-600 leading-relaxed ml-3">
                            {Description}
                        </p>
                    </div>
                )}
            </div>
            <h4>Buy now online and have it delivered to your doorstep.</h4>
        </div>

    );
};

export default ProductInfo;
