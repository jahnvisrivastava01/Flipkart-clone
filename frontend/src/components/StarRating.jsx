import { FaStar } from "react-icons/fa";

const StarRating = ({ rating = 0, numReviews }) => {
  if (!rating) return null;
  return (
    <div className="flex items-center gap-1">
      <span className="bg-flipgreen text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
        {rating.toFixed(1)} <FaStar size={9} />
      </span>
      {numReviews !== undefined && (
        <span className="text-gray-500 text-xs">({numReviews})</span>
      )}
    </div>
  );
};

export default StarRating;
