import { Link } from "react-router-dom";
import StarRating from "./StarRating.jsx";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="bg-white dark:bg-slate-800 rounded-sm p-4 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    >
      <div className="h-40 flex items-center justify-center mb-3">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="max-h-40 object-contain"
        />
      </div>
      <h3 className="text-sm text-gray-800 dark:text-gray-100 line-clamp-2 mb-1">{product.title}</h3>
      <StarRating rating={product.rating} numReviews={product.numReviews} />
      <div className="flex items-center gap-2 mt-1">
        <span className="font-semibold text-gray-900 dark:text-white">₹{product.price.toLocaleString("en-IN")}</span>
        {product.mrp > product.price && (
          <>
            <span className="text-xs text-gray-500 line-through">
              ₹{product.mrp.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-flipgreen font-medium">
              {product.discountPercent}% off
            </span>
          </>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
