import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/orders/`;

// Create New Product
const createOrder = async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
};

// Get all products
const getOrders = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Delete a Product
const deleteOrder = async (id) => {
    const response = await axios.delete(API_URL + id);
    return response.data;
};
// Get a Product
const getOrder = async (id) => {
    const response = await axios.get(API_URL + id);
    return response.data;
};

// Update Product
const updateOrder = async (id, formData) => {
    const response = await axios.patch(`${API_URL}${id}`, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

const orderService = {
    createOrder,
    getOrders,
    getOrder,
    deleteOrder,
    updateOrder
};

export default orderService;