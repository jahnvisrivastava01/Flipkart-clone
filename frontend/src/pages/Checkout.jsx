import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useCart } from "../context/CartContext.jsx";

const Checkout = () => {
  const { items, itemsTotal, clearCart } = useCart();
  const [address, setAddress] = useState({ line1: "", city: "", state: "", pincode: "", phone: "" });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  const shippingFee = itemsTotal > 500 ? 0 : 40;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");
    setPlacing(true);
    try {
      const orderItems = items.map((i) => ({ product: i.product, quantity: i.quantity }));
      const { data } = await api.post("/orders", {
        items: orderItems,
        shippingAddress: address,
        paymentMethod,
      });
      clearCart();
      navigate(`/orders`, { state: { placedOrderId: data._id } });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-4">
      <form onSubmit={handlePlaceOrder} className="flex-1 bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-medium border-b dark:border-slate-700 pb-3 dark:text-gray-100">Delivery Address</h2>
        <input
          required
          placeholder="Address (House no, Street, Area)"
          value={address.line1}
          onChange={(e) => setAddress({ ...address, line1: e.target.value })}
          className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            required
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm"
          />
          <input
            required
            placeholder="State"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            className="border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm"
          />
          <input
            required
            placeholder="Pincode"
            value={address.pincode}
            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
            className="border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm"
          />
          <input
            required
            placeholder="Phone Number"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            className="border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm"
          />
        </div>

        <h2 className="text-lg font-medium border-b dark:border-slate-700 pb-3 pt-4 dark:text-gray-100">Payment Method</h2>
        <div className="space-y-2">
          {["COD", "CARD", "UPI"].map((method) => (
            <label key={method} className="flex items-center gap-2 text-sm dark:text-gray-200">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
              />
              {method === "COD" ? "Cash on Delivery" : method === "CARD" ? "Credit/Debit Card" : "UPI"}
            </label>
          ))}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={placing}
          className="w-full bg-flipaccent text-white font-medium py-3 rounded-sm disabled:opacity-50"
        >
          {placing ? "Placing order..." : "PLACE ORDER"}
        </button>
      </form>

      <div className="w-full md:w-80 bg-white dark:bg-slate-800 rounded-sm shadow-sm p-4 h-fit">
        <h2 className="text-gray-500 dark:text-gray-400 font-medium border-b dark:border-slate-700 pb-3 mb-3">ORDER SUMMARY</h2>
        {items.map((i) => (
          <div key={i.product} className="flex justify-between text-sm py-1 dark:text-gray-200">
            <span className="truncate pr-2">{i.title} x{i.quantity}</span>
            <span>₹{(i.price * i.quantity).toLocaleString("en-IN")}</span>
          </div>
        ))}
        <div className="flex justify-between text-sm py-1 border-t dark:border-slate-700 mt-2 pt-2 dark:text-gray-200">
          <span>Delivery</span>
          <span className={shippingFee === 0 ? "text-flipgreen" : ""}>
            {shippingFee === 0 ? "Free" : `₹${shippingFee}`}
          </span>
        </div>
        <div className="flex justify-between font-semibold border-t dark:border-slate-700 mt-2 pt-2 dark:text-white">
          <span>Total</span>
          <span>₹{(itemsTotal + shippingFee).toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
