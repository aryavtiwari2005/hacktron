import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import { FaDotCircle } from "react-icons/fa";
import "./CategoryList.scss";
import {
    FILTER_PRODUCTS,
    selectFilteredPoducts,
} from "../../../redux/features/product/filterSlice";
import {
    getProducts,
} from "../../../redux/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";

const CategoryList = ({ products, isLoading }) => {
    const filteredProducts = useSelector(selectFilteredPoducts);

    const dispatch = useDispatch();

    const shortenText = (text, n) => {
        if (text.length > n) {
            const shortenedText = text.substring(0, n).concat("...");
            return shortenedText;
        }
        return text;
    };

    const fetchProducts = async () => {
        await dispatch(getProducts());
    };

    const groupProductsByCategory = (products) => {
        return products.reduce((acc, product) => {
            const { category } = product;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(product);
            return acc;
        }, {});
    };

    const groupedProducts = groupProductsByCategory(products);

    useEffect(() => {
        fetchProducts();
    }, [dispatch]);

    return (
        <div className="product-category">
            <h3>Product Categories</h3>
            {isLoading ? (
                <SpinnerImg />
            ) : (
                <div className="category-list">
                    {Object.keys(groupedProducts).length > 0 ? (
                        Object.keys(groupedProducts).map((category) => (
                            <div className="category" key={category}>
                                <div className="heading">
                                    <FaDotCircle />
                                    <h4>{category}</h4>
                                </div>
                                <ul>
                                    {groupedProducts[category].map((product, index) => (
                                        <li key={product.id || index}>
                                            {product.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default CategoryList;