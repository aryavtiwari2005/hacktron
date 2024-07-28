import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { MdDeliveryDining } from "react-icons/md";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "Category",
    icon: <MdCategory />,
    path: "/product-categories"
  },
  {
    title: "Create Order",
    icon: <FaBox />,
    path: "/add-order"
  },
  {
    title: "Order Status",
    icon: <MdDeliveryDining />,
    path: "/order-status",
  },
  {
    title: "Messaging",
    icon: <MdMessage />,
    path: "/messaging"
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
];

export default menu;
