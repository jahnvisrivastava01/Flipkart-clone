import { useEffect, useState } from "react";
import api from "../api/axios.js";

const emptyForm = {
  title: "",
  description: "",
  brand: "",
  category: "",
  price: "",
  mrp: "",
  discountPercent: "",
  stock: "",
};

const Admin = () => {
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [tab, setTab] = useState("products");
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);

      const res = await api.get("/products", {
        params: {
          limit: 100,
        },
      });

      setProducts(res.data.products || []);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoadingProducts(false);
    }
  };

  // Fetch products when Products tab is opened
  useEffect(() => {
    if (tab === "products") {
      fetchProducts();
    }
  }, [tab]);

  // Fetch orders
  useEffect(() => {
    if (tab === "orders") {
      api.get("/orders").then((res) => setOrders(res.data));
    }
  }, [tab]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Start editing
  const startEdit = (product) => {
    setEditingId(product._id);

    setForm({
      title: product.title || "",
      description: product.description || "",
      brand: product.brand || "",
      category: product.category || "",
      price: product.price || "",
      mrp: product.mrp || "",
      discountPercent: product.discountPercent || "",
      stock: product.stock || "",
    });

    setCurrentImage(product.images?.[0] || "");
    setImageFile(null);
    setMsg("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setCurrentImage("");
    setMsg("");
  };

  // Add / Update product
  const submitProduct = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      let imageUrls = currentImage ? [currentImage] : [];

      // Upload new image if selected
      if (imageFile) {
        setUploading(true);

        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await api.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        imageUrls = [uploadRes.data.url];

        setUploading(false);
      }

      const productData = {
        ...form,
        price: Number(form.price),
        mrp: Number(form.mrp),
        discountPercent: Number(form.discountPercent) || 0,
        stock: Number(form.stock) || 0,
        images: imageUrls,
      };

      if (editingId) {
        // UPDATE
        await api.put(`/products/${editingId}`, productData);

        setMsg("Product updated successfully!");
      } else {
        // ADD
        await api.post("/products", productData);

        setMsg("Product added successfully!");
      }

      setForm(emptyForm);
      setImageFile(null);
      setCurrentImage("");
      setEditingId(null);

      await fetchProducts();
    } catch (err) {
      setUploading(false);

      setMsg(
        err.response?.data?.message ||
          (editingId
            ? "Failed to update product"
            : "Failed to add product")
      );
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/products/${id}`);

      setProducts((prev) => prev.filter((p) => p._id !== id));

      setMsg("Product deleted successfully!");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to delete product");
    }
  };

  // Update order status
  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });

    setOrders((prev) =>
      prev.map((o) =>
        o._id === id ? { ...o, status } : o
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* Heading */}
      <h2 className="text-xl font-medium mb-4 dark:text-gray-100">
        Admin Panel
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b dark:border-slate-700">
        {["products", "orders"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`
              pb-2
              px-2
              text-sm
              font-medium
              capitalize
              transition-colors
              duration-200
              ${
                tab === t
                  ? "border-b-2 border-flipblue text-flipblue"
                  : "text-gray-500 dark:text-gray-400"
              }
            `}
          >
            {t}
          </button>
        ))}
      </div>

      {/* PRODUCTS TAB */}
      {tab === "products" ? (
        <>
          {/* Add / Edit Form */}
          <form
            onSubmit={submitProduct}
            className="
              bg-white
              dark:bg-slate-800
              rounded-sm
              shadow-sm
              p-6
              space-y-3
              max-w-xl
              mb-8
            "
          >
            <h3 className="font-medium dark:text-gray-100">
              {editingId ? "Edit Product" : "Add New Product"}
            </h3>

            <input
              required
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm"
            />

            <textarea
              required
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm"
              rows={2}
            />

            <div className="grid grid-cols-2 gap-3">

              <input
                name="brand"
                placeholder="Brand"
                value={form.brand}
                onChange={handleChange}
                className="border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm"
              />

              <input
                required
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                className="border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm"
              />

              <input
                required
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm"
              />

              <input
                required
                type="number"
                name="mrp"
                placeholder="MRP"
                value={form.mrp}
                onChange={handleChange}
                className="border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm"
              />

              <input
                type="number"
                name="discountPercent"
                placeholder="Discount %"
                value={form.discountPercent}
                onChange={handleChange}
                className="border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm"
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
                className="border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm"
              />
            </div>

            {/* Current image when editing */}
            {editingId && (
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                  Current Product Image
                </label>

                {currentImage ? (
                  <img
                    src={currentImage}
                    alt={form.title}
                    className="w-32 h-32 object-contain border rounded p-2 mb-2"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-32 h-32 border rounded flex items-center justify-center text-xs text-gray-500 mb-2">
                    No image
                  </div>
                )}
              </div>
            )}

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                {editingId ? "Replace Product Image" : "Product Image"}
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImageFile(e.target.files[0])
                }
                className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm"
              />

              {imageFile && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Selected: {imageFile.name}
                </p>
              )}
            </div>

            {msg && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {msg}
              </p>
            )}

            <div className="flex gap-3">

              <button
                type="submit"
                disabled={uploading}
                className="
                  bg-flipblue
                  text-white
                  px-6
                  py-2
                  rounded-sm
                  text-sm
                  disabled:opacity-50
                  transition-all
                  duration-200
                  hover:shadow-md
                  hover:-translate-y-0.5
                "
              >
                {uploading
                  ? "Uploading..."
                  : editingId
                  ? "Update Product"
                  : "Add Product"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="
                    border
                    border-gray-300
                    dark:border-slate-600
                    px-6
                    py-2
                    rounded-sm
                    text-sm
                    dark:text-gray-200
                    hover:bg-gray-100
                    dark:hover:bg-slate-700
                    transition-colors
                  "
                >
                  Cancel
                </button>
              )}

            </div>
          </form>

          {/* Product List */}
          <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-5">

            <h3 className="text-lg font-medium dark:text-gray-100 mb-4">
              Manage Products
            </h3>

            {loadingProducts ? (
              <p className="text-sm text-gray-500">
                Loading products...
              </p>
            ) : products.length === 0 ? (
              <p className="text-sm text-gray-500">
                No products found.
              </p>
            ) : (
              <div className="space-y-3">

                {products.map((product) => (
                  <div
                    key={product._id}
                    className="
                      flex
                      items-center
                      gap-4
                      border
                      dark:border-slate-700
                      rounded
                      p-3
                      transition-all
                      duration-200
                      hover:shadow-md
                    "
                  >

                    {/* Image */}
                    <div className="w-20 h-20 shrink-0 flex items-center justify-center border dark:border-slate-700 rounded">

                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-contain rounded"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.parentElement.innerHTML =
                              '<span class="text-xs text-gray-400">No image</span>';
                          }}
                        />
                      ) : (
                        <span className="text-xs text-gray-400">
                          No image
                        </span>
                      )}

                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">

                      <p className="font-medium text-sm dark:text-gray-100 line-clamp-2">
                        {product.title}
                      </p>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        ₹{product.price?.toLocaleString("en-IN")}
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {product.category} · Stock: {product.stock}
                      </p>

                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 shrink-0">

                      <button
                        onClick={() => startEdit(product)}
                        className="
                          bg-flipblue
                          text-white
                          px-4
                          py-2
                          rounded
                          text-sm
                          transition-all
                          duration-200
                          hover:shadow-md
                          hover:-translate-y-0.5
                        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="
                          bg-red-500
                          text-white
                          px-4
                          py-2
                          rounded
                          text-sm
                          transition-all
                          duration-200
                          hover:bg-red-600
                          hover:shadow-md
                          hover:-translate-y-0.5
                        "
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                ))}

              </div>
            )}
          </div>
        </>
      ) : (
        /* ORDERS TAB */
        <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-4 space-y-3">

          {orders.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No orders yet.
            </p>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="border-b dark:border-slate-700 pb-3"
              >
                <p className="text-sm dark:text-gray-200">
                  <span className="font-medium">
                    {order.user?.name}
                  </span>{" "}
                  ({order.user?.email})
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {order.items.length} item(s) · ₹
                  {order.grandTotal.toLocaleString("en-IN")}
                </p>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="mt-1 border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-2 py-1 text-sm"
                >
                  {[
                    "Placed",
                    "Shipped",
                    "Out for Delivery",
                    "Delivered",
                    "Cancelled",
                  ].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            ))
          )}

        </div>
      )}
    </div>
  );
};

export default Admin;