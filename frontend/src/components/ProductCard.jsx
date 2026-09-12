import { Link } from "react-router-dom";
import StarRating from "./StarRating.jsx";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="
        group
        bg-white
        dark:bg-slate-800
        rounded-sm
        p-4
        flex
        flex-col
        transition-all
        duration-300
        ease-out
        hover:shadow-xl
        hover:-translate-y-1
      "
    >
      {/* Product Image */}
      <div className="h-40 flex items-center justify-center mb-3 overflow-hidden">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="
            max-h-40
            object-contain
            transition-transform
            duration-500
            ease-out
            group-hover:scale-110
          "
        />
      </div>

      {/* Product Title */}
      <h3
        className="
          text-sm
          text-gray-800
          dark:text-gray-100
          line-clamp-2
          mb-1
          transition-colors
          duration-200
          group-hover:text-flipblue
        "
      >
        {product.title}
      </h3>

      {/* Rating */}
      <StarRating
        rating={product.rating}
        numReviews={product.numReviews}
      />

      {/* Price */}
      <div className="flex items-center gap-2 mt-1">
        <span className="font-semibold text-gray-900 dark:text-white">
          ₹{product.price.toLocaleString("en-IN")}
        </span>

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