import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios.js";
import ProductCard from "../components/ProductCard.jsx";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get("/products", { params: { keyword, sort } })
      .then((res) => setProducts(res.data.products))
      .finally(() => setLoading(false));
  }, [keyword, sort]);

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-4">
      <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-4 mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium dark:text-gray-100">
          Showing results for <span className="text-flipblue">"{keyword}"</span>
        </h2>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-2 py-1 text-sm"
        >
          <option value="">Sort: Relevance</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-4">
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">Searching...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No products matched your search.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
