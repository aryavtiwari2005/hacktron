import React from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./OrderForm.scss";

const OrderForm = ({
  order,
  handleInputChange,
  saveOrder,
}) => {
  return (
    <div className="add-order">
      <Card cardClass={"card"}>
        <form onSubmit={saveOrder}>
          <label>Order Name:</label>
          <input
            type="text"
            placeholder="Order name"
            name="name"
            value={order?.name}
            onChange={handleInputChange}
          />

          <label>Ordered Item SKU:</label>
          <input
            type="text"
            placeholder="Item SKU"
            name="itemsku"
            value={order?.itemsku}
            onChange={handleInputChange}
          />

          <label>Order Quantity:</label>
          <input
            type="text"
            placeholder="Order Quantity"
            name="quantity"
            value={order?.quantity}
            onChange={handleInputChange}
          />

          <label>Order Location:</label>
          <input
            type="text"
            placeholder="Order Location"
            name="location"
            value={order?.location}
            onChange={handleInputChange}
          />

          <label>Phone Number:</label>
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={order?.phone}
            onChange={handleInputChange}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Place Order
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

OrderForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
OrderForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default OrderForm;