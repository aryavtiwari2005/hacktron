import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";

const initialState = {
  name: "",
  quantity: "",
  price: "",
  expiry: "",
  category: ""
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);

  const isLoading = useSelector(selectIsLoading);

  const { name, quantity, price, expiry, category } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const generateKSKU = (name) => {
    const letter = name.slice(0, 3).toUpperCase();
    const number = new Date().getMilliseconds();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("expiry", expiry);
    formData.append("quantity", quantity);
    formData.append("price", price);

    var object = {
      name: name,
      quantity: quantity,
      price: price,
      expiry: expiry,
      itemsku: generateKSKU(name),
      category: category
    };
    console.log(object)

    await dispatch(createProduct(object));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>
      <ProductForm
        product={product}
        handleInputChange={handleInputChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;
