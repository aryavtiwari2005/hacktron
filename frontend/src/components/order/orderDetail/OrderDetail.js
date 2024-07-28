import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./OrderDetail.scss";
import {
    FILTER_PRODUCTS,
    selectFilteredPoducts,
} from "../../../redux/features/product/filterSlice";
import {
    getOrders,
    updateOrder
} from "../../../redux/features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";

const selectOrders = (state) => state.order.orders;
const selectIsLoading = (state) => state.order.isLoading;

const OrderDetail = () => {
    const filteredProducts = useSelector(selectFilteredPoducts);
    const orders = useSelector(selectOrders);
    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();
    const [selectedOrder, setSelectedOrder] = useState(null);

    const shortenText = (text, n) => {
        if (text.length > n) {
            const shortenedText = text.substring(0, n).concat("...");
            return shortenedText;
        }
        return text;
    };

    const fetchOrders = async () => {
        await dispatch(getOrders());
    };

    useEffect(() => {
        fetchOrders();
    }, [dispatch]);

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const handleStatusChange = async (status) => {
        if (selectedOrder) {
            const updatedOrder = { ...selectedOrder, status };
            console.log(updatedOrder)
            await dispatch(updateOrder([selectedOrder._id, updatedOrder]));
            setSelectedOrder(null); // Close the shipping area after updating
            fetchOrders(); // Refresh the orders list
        }
    };

    return (
        <div className="order-details">
            <h3>Order Details</h3>
            {isLoading ? (
                <SpinnerImg />
            ) : (
                <ul>
                    {orders && orders.length > 0 ? (
                        orders.map((order, index) => (
                            <li key={order.id || index}>
                                <button onClick={() => handleOrderClick(order)}>
                                    Name: {order.name}, Quantity: {order.quantity}, Location: {order.location}, <span style={{ color: "grey" }}>Status: {order.status}</span>
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>No Orders available</p>
                    )}
                </ul>
            )}
            {selectedOrder && (
                <div className="shipping-area">
                    <h4>Shipping Area</h4>
                    <p>Order: {selectedOrder.name}</p>
                    <p>Status: {selectedOrder.status}</p>
                    <div className="actions">
                        {selectedOrder.status === "Delivered" ? (
                            <p>
                                This order has been delivered and cannot be changed.
                                <button onClick={() => setSelectedOrder(null)} style={{ marginLeft: "10px" }}>Cancel</button>
                            </p>
                        ) : (
                            <>
                                {
                                    selectedOrder.status !== "In-Transit" && selectedOrder.status !== "Delivered" && (
                                        <button onClick={() => handleStatusChange("Approved")}>
                                            Approve
                                        </button>
                                    )
                                }
                                {selectedOrder.status !== "In-Transit" && (
                                    <button onClick={() => handleStatusChange("In-Transit")}>
                                        Mark as In-Transit
                                    </button>
                                )}
                                {selectedOrder.status !== "Delivered" && (
                                    <button onClick={() => handleStatusChange("Delivered")}>
                                        Mark as Delivered
                                    </button>
                                )}
                                <button onClick={() => setSelectedOrder(null)}>
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )
            }
        </div >
    )
}

export default OrderDetail;