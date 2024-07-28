import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import OrderForm from "../../components/order/orderForm/OrderForm"
import {
    createOrder,
    selectIsLoading,
} from "../../redux/features/order/orderSlice";

const initialState = {
    name: "",
    itemsku: "",
    quantity: "",
    location: "",
    phone: ""
};

const AddOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [order, setOrder] = useState(initialState);

    const isLoading = useSelector(selectIsLoading);

    const { name, itemsku, quantity, location, phone } = order;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });
    };

    const saveOrder = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("itemsku", itemsku)
        formData.append("quantity", quantity);

        var object = {
            name: name,
            itemsku: itemsku,
            quantity: quantity,
            location: location,
            phone: phone
        };
        console.log(object)

        await dispatch(createOrder(object));

        navigate("/dashboard");
    };

    return (
        <div>
            {isLoading && <Loader />}
            <h3 className="--mt">Create New Order</h3>
            <OrderForm
                order={order}
                handleInputChange={handleInputChange}
                saveOrder={saveOrder}
            />
        </div>
    );
}

export default AddOrder;