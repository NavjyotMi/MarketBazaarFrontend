import React, { useState } from "react";
import { productSchema } from "../../Schemas/ProductSchema";
import { useSelector } from "react-redux";
import { useCreateProductMutation } from "../../Redux/features/products/ProductApi";

function CreateProduct() {
  const sellerId = useSelector((state) => state.user.id);
  const [productData, setProductData] = useState({
    price: "",
    name: "",
    description: "",
    imageUrl: "",
    stock: "",
    seller: sellerId,
    category: "",
  });
  const [createProduct] = useCreateProductMutation();
  function handleChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setProductData((prev) => {
      if (name === "imageUrl") {
        const file = e.target.files[0];
        console.log(e);
        console.log(file);
        return { ...prev, [name]: file };
      }
      return { ...prev, [name]: value };
    });
    console.log(productData);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(productData);
      const varified = await productSchema.validate(productData);
      console.log(varified);
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("description", productData.description);
      formData.append("stock", productData.stock);
      formData.append("category", productData.category);
      formData.append("imageUrl", productData.imageUrl);
      formData.append("seller", sellerId);
      const datas = await createProduct(formData);
      console.log(datas);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Create New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Enter the name of the product"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            name="description"
            placeholder="Enter the description for product"
            value={productData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="number"
            name="price"
            placeholder="Enter the price for the product"
            value={productData.price}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            name="category"
            placeholder="Enter the category for the product"
            value={productData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="number"
            name="stock"
            placeholder="Enter the stock availability"
            value={productData.stock}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="file"
            name="imageUrl"
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
