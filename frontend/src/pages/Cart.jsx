import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, itemsTotal, totalQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const shippingFee = itemsTotal > 500 || itemsTotal === 0 ? 0 : 40;

  const handleCheckout = () => {
    if (!user) return navigate("/login");
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center bg-white dark:bg-slate-800 rounded-sm shadow-sm mt-6">
        <h2 className="text-xl font-medium text-gray-700 dark:text-gray-200">Your cart is empty!</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Add items to it now.</p>
        <Link to="/" className="inline-block mt-4 bg-flipblue text-white px-6 py-2 rounded-sm">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-4 flex flex-col md:flex-row gap-4">
      <div className="flex-1 bg-white dark:bg-slate-800 rounded-sm shadow-sm p-4">
        <h2 className="text-lg font-medium border-b dark:border-slate-700 pb-3 mb-3 dark:text-gray-100">My Cart ({totalQuantity})</h2>
        {items.map((item) => (
          <div key={item.product} className="flex gap-4 border-b dark:border-slate-700 py-4">
            <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
            <div className="flex-1">
              <p className="text-sm text-gray-800 dark:text-gray-100">{item.title}</p>
              <p className="font-semibold mt-1 dark:text-white">₹{item.price.toLocaleString("en-IN")}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center border dark:border-slate-600 rounded">
                  <button
                    onClick={() => updateQuantity(item.product, Math.max(1, item.quantity - 1))}
                    className="px-3 py-1 text-gray-600 dark:text-gray-300"
                  >
                    -
                  </button>
                  <span className="px-3 dark:text-gray-100">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product, Math.min(item.stock || 99, item.quantity + 1))
                    }
                    className="px-3 py-1 text-gray-600 dark:text-gray-300"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.product)}
                  className="text-sm text-gray-600 dark:text-gray-400 font-medium hover:text-red-500"
                >
                  REMOVE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full md:w-80 bg-white dark:bg-slate-800 rounded-sm shadow-sm p-4 h-fit">
        <h2 className="text-gray-500 dark:text-gray-400 font-medium border-b dark:border-slate-700 pb-3 mb-3">PRICE DETAILS</h2>
        <div className="flex justify-between text-sm py-1 dark:text-gray-200">
          <span>Price ({totalQuantity} items)</span>
          <span>₹{itemsTotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-sm py-1 dark:text-gray-200">
          <span>Delivery Charges</span>
          <span className={shippingFee === 0 ? "text-flipgreen" : ""}>
            {shippingFee === 0 ? "Free" : `₹${shippingFee}`}
          </span>
        </div>
        <div className="flex justify-between font-semibold border-t dark:border-slate-700 mt-2 pt-2 dark:text-white">
          <span>Total Amount</span>
          <span>₹{(itemsTotal + shippingFee).toLocaleString("en-IN")}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full mt-4 bg-flipaccent text-white font-medium py-3 rounded-sm"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default Cart;
