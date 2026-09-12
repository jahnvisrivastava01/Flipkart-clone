import { useEffect, useState } from "react";
import api from "../api/axios.js";

const statusColor = {
  Placed: "bg-blue-100 text-blue-700",
  Shipped: "bg-yellow-100 text-yellow-700",
  "Out for Delivery": "bg-orange-100 text-orange-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/my").then((res) => setOrders(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10 text-gray-500">Loading orders...</p>;

  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center bg-white dark:bg-slate-800 rounded-sm shadow-sm mt-6">
        <h2 className="text-xl font-medium text-gray-700 dark:text-gray-200">No orders yet</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Your placed orders will show up here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
      <h2 className="text-xl font-medium dark:text-gray-100">My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-4">
          <div className="flex justify-between items-center border-b dark:border-slate-700 pb-2 mb-2">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Order ID: {order._id}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Placed on {new Date(order.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded ${statusColor[order.status]}`}>
              {order.status}
            </span>
          </div>
          {order.items.map((item, i) => (
            <div key={i} className="flex gap-3 py-2">
              <img src={item.image} alt={item.title} className="w-14 h-14 object-contain" />
              <div className="flex-1">
                <p className="text-sm text-gray-800 dark:text-gray-100">{item.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-medium dark:text-gray-100">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
            </div>
          ))}
          <div className="text-right font-semibold border-t dark:border-slate-700 pt-2 mt-2 dark:text-white">
            Total: ₹{order.grandTotal.toLocaleString("en-IN")}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
