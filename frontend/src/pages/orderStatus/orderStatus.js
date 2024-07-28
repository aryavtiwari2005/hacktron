import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderDetails from "../../components/order/orderDetail/OrderDetail"
import Loader from "../../components/loader/Loader";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getOrders } from "../../redux/features/order/orderSlice";

const OrderStatus = () => {
    useRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { orders, isLoading, isError, message } = useSelector(
        (state) => state.order
    );

    useEffect(() => {
        if (isLoggedIn === true) {
            dispatch(getOrders());
        }

        if (isError) {
            console.log(message);
        }
    }, [isLoggedIn, isError, message, dispatch]);

    return (
        <div className="order-status">
            <OrderDetails />
        </div>
    )
}

export default OrderStatus;