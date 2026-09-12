import { useEffect, useState } from "react";
import api from "../api/axios.js";

const emptyForm = {
  title: "", description: "", brand: "", category: "", price: "", mrp: "",
  discountPercent: "", images: "", stock: "",
};

const Admin = () => {
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState("products");

  useEffect(() => {
    if (tab === "orders") {
      api.get("/orders").then((res) => setOrders(res.data));
    }
  }, [tab]);

  const submitProduct = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      let imageUrls = [];

      // Upload image to Cloudinary first
      if (imageFile) {
        setUploading(true);

        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await api.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        imageUrls.push(uploadRes.data.url);

        setUploading(false);
      }

      // Create product with Cloudinary image URL
      await api.post("/products", {
        ...form,
        price: Number(form.price),
        mrp: Number(form.mrp),
        discountPercent: Number(form.discountPercent) || 0,
        stock: Number(form.stock) || 0,
        images: imageUrls,
      });

      setMsg("Product added successfully!");
      setForm(emptyForm);
      setImageFile(null);
    } catch (err) {
      setUploading(false);
      setMsg(err.response?.data?.message || "Failed to add product");
    }
  };

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-xl font-medium mb-4 dark:text-gray-100">Admin Panel</h2>
      <div className="flex gap-4 mb-4 border-b dark:border-slate-700">
        {["products", "orders"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 px-2 text-sm font-medium capitalize ${tab === t ? "border-b-2 border-flipblue text-flipblue" : "text-gray-500 dark:text-gray-400"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "products" ? (
        <form onSubmit={submitProduct} className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 space-y-3 max-w-xl">
          <h3 className="font-medium dark:text-gray-100">Add New Product</h3>
          <input required placeholder="Title" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm" />
          <textarea required placeholder="Description" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm" rows={2} />
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Brand" value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm" />
            <input required placeholder="Category" value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm" />
            <input required type="number" placeholder="Price" value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm" />
            <input required type="number" placeholder="MRP" value={form.mrp}
              onChange={(e) => setForm({ ...form, mrp: e.target.value })}
              className="border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm" />
            <input type="number" placeholder="Discount %" value={form.discountPercent}
              onChange={(e) => setForm({ ...form, discountPercent: e.target.value })}
              className="border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm" />
            <input type="number" placeholder="Stock" value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-3 py-2 text-sm"
            />

            {imageFile && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Selected: {imageFile.name}
              </p>
            )}
          </div>
          {msg && <p className="text-sm text-gray-600 dark:text-gray-400">{msg}</p>}
          <button
            type="submit"
            disabled={uploading}
            className="bg-flipblue text-white px-6 py-2 rounded-sm text-sm disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Add Product"}
          </button>
        </form>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-4 space-y-3">
          {orders.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="border-b dark:border-slate-700 pb-3">
                <p className="text-sm dark:text-gray-200">
                  <span className="font-medium">{order.user?.name}</span> ({order.user?.email})
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {order.items.length} item(s) · ₹{order.grandTotal.toLocaleString("en-IN")}
                </p>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="mt-1 border dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded px-2 py-1 text-sm"
                >
                  {["Placed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"].map((s) => (
                    <option key={s} value={s}>{s}</option>
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
