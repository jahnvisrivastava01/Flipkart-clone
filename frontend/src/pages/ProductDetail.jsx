import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import StarRating from "../components/StarRating.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const loadProduct = () => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  if (!product) return <p className="text-center py-10 text-gray-500">Loading...</p>;

  const handleAddToCart = () => {
    if (!user) return navigate("/login", { state: { from: `/product/${id}` } });
    addToCart(product, 1);
  };

  const handleBuyNow = () => {
    if (!user) return navigate("/login", { state: { from: `/product/${id}` } });
    addToCart(product, 1);
    navigate("/cart");
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/products/${id}/reviews`, { rating, comment });
      setMsg("Review submitted!");
      setComment("");
      loadProduct();
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-4">
      <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 flex flex-col md:flex-row gap-8">
        <div className="md:w-2/5 flex items-center justify-center">
          <img src={product.images?.[0]} alt={product.title} className="max-h-96 object-contain" />
        </div>

        <div className="flex-1">
          <h1 className="text-xl font-medium text-gray-800 dark:text-gray-100">{product.title}</h1>
          <div className="mt-2">
            <StarRating rating={product.rating} numReviews={product.numReviews} />
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-semibold dark:text-white">₹{product.price.toLocaleString("en-IN")}</span>
            {product.mrp > product.price && (
              <>
                <span className="text-gray-500 line-through">₹{product.mrp.toLocaleString("en-IN")}</span>
                <span className="text-flipgreen font-medium">{product.discountPercent}% off</span>
              </>
            )}
          </div>

          {product.highlights?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Highlights</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-0.5">
                {product.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{product.description}</p>

          <p className={`mt-3 text-sm font-medium ${product.stock > 0 ? "text-flipgreen" : "text-red-500"}`}>
            {product.stock > 0 ? `In stock (${product.stock} available)` : "Out of stock"}
          </p>

          <div className="mt-6 flex gap-4">
            <button
              disabled={product.stock === 0}
              onClick={handleAddToCart}
              className="flex-1 md:flex-none bg-flipaccent text-white font-medium px-10 py-3 rounded-sm disabled:opacity-50"
            >
              ADD TO CART
            </button>
            <button
              disabled={product.stock === 0}
              onClick={handleBuyNow}
              className="flex-1 md:flex-none bg-flipblue text-white font-medium px-10 py-3 rounded-sm disabled:opacity-50"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 mt-4">
        <h2 className="text-lg font-medium mb-4 dark:text-gray-100">Ratings & Reviews</h2>

        {product.reviews?.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="space-y-4 mb-6">
            {product.reviews.map((r, i) => (
              <div key={i} className="border-b dark:border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-flipgreen text-white text-xs px-1.5 py-0.5 rounded">
                    {r.rating} ★
                  </span>
                  <span className="font-medium text-sm dark:text-gray-100">{r.name}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{r.comment}</p>
              </div>
            ))}
          </div>
        )}

        {user ? (
          <form onSubmit={submitReview} className="space-y-3 max-w-md">
            <div>
              <label className="text-sm font-medium dark:text-gray-200">Your rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="block border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-2 py-1 mt-1"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review"
              className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm"
              rows={3}
              required
            />
            <button type="submit" className="bg-flipblue text-white px-6 py-2 rounded-sm text-sm">
              Submit Review
            </button>
            {msg && <p className="text-sm text-gray-600 dark:text-gray-400">{msg}</p>}
          </form>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">Log in to write a review.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
