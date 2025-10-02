import React, { useState } from "react";

function Test() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    brand: "",
    sku: "",
    price: "",
    discountPrice: "",
    stock: "",
    description: "",
    weight: "",
    dimensions: "",
    color: "",
    size: "",
    shipping: "",
    deliveryTime: "",
    warranty: "",
    sellerEmail: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg space-y-6"
    >
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        🛒 Add New Product
      </h2>

      {/* Product Title */}
      <div>
        <label className="block mb-1 font-semibold">Product Title</label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="e.g. Samsung Galaxy S24 Ultra"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-semibold">Category</label>
        <select
          name="category"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Home Appliances</option>
          <option>Beauty</option>
          <option>Sports</option>
        </select>
      </div>

      {/* Brand + SKU */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Brand</label>
          <input
            type="text"
            name="brand"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g. Samsung"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">SKU / Model</label>
          <input
            type="text"
            name="sku"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Unique product ID"
          />
        </div>
      </div>

      {/* Price */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Price ($)</label>
          <input
            type="number"
            name="price"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Discount Price ($)</label>
          <input
            type="number"
            name="discountPrice"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      {/* Stock */}
      <div>
        <label className="block mb-1 font-semibold">Stock Quantity</label>
        <input
          type="number"
          name="stock"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {/* Variations */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Color</label>
          <input
            type="text"
            name="color"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g. Black, White"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Size</label>
          <input
            type="text"
            name="size"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g. S, M, L, XL"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Weight (kg)</label>
          <input
            type="text"
            name="weight"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g. 1.2"
          />
        </div>
      </div>

      {/* Dimensions */}
      <div>
        <label className="block mb-1 font-semibold">Dimensions (L × W × H)</label>
        <input
          type="text"
          name="dimensions"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="e.g. 15 × 7 × 0.8 cm"
        />
      </div>

      {/* Shipping */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Shipping Option</label>
          <select
            name="shipping"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            <option>Standard</option>
            <option>Express</option>
            <option>Pickup</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Delivery Time</label>
          <input
            type="text"
            name="deliveryTime"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g. 3–5 business days"
          />
        </div>
      </div>

      {/* Warranty */}
      <div>
        <label className="block mb-1 font-semibold">Warranty / Return Policy</label>
        <input
          type="text"
          name="warranty"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="e.g. 1 Year Warranty"
        />
      </div>

      {/* Seller Info */}
      <div>
        <label className="block mb-1 font-semibold">Seller Contact Email</label>
        <input
          type="email"
          name="sellerEmail"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="seller@example.com"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-semibold">Product Description</label>
        <textarea
          name="description"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows="5"
          placeholder="Write a detailed description..."
        />
      </div>

      {/* Images */}
      <div>
        <label className="block mb-1 font-semibold">Product Images</label>
        <input
          type="file"
          name="images"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          multiple
          accept="image/*"
        />
        <p className="text-sm text-gray-500">Upload up to 8 images</p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
      >
        ✅ Save Product
      </button>
    </form>
  );
}

export default Test;
