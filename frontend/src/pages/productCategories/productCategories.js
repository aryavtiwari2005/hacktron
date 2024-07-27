import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import CategoryList from "../../components/category/categoryList/CategoryList";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getProducts } from "../../redux/features/product/productSlice";

const ProductCategories = () => {
    useRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { products, isLoading, isError, message } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        if (isLoggedIn === true) {
            dispatch(getProducts());
        }

        if (isError) {
            console.log(message);
        }
    }, [isLoggedIn, isError, message, dispatch]);

    return (
        <div className="product-categories">
            <CategoryList products={products} isLoading={isLoading} />
        </div>
    )
}

export default ProductCategories;