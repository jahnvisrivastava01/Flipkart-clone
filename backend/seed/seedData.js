import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

dotenv.config();
await connectDB();

const products = [
  {
    title: "Redmi Note 13 Pro (Midnight Black, 128GB)",
    description: "6.67-inch AMOLED display, 200MP camera, 5000mAh battery.",
    brand: "Redmi",
    category: "Mobiles",
    price: 21999,
    mrp: 26999,
    discountPercent: 18,
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600"],
    stock: 50,
    highlights: ["200MP OIS Camera", "120Hz AMOLED Display", "67W Turbo Charging"],
    specifications: { RAM: "8GB", Storage: "128GB", Battery: "5000mAh" },
  },
  {
    title: "Apple MacBook Air M2 (13-inch, 8GB, 256GB SSD)",
    description: "Supercharged by the M2 chip, all-day battery life.",
    brand: "Apple",
    category: "Laptops",
    price: 99900,
    mrp: 114900,
    discountPercent: 13,
    images: ["https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600"],
    stock: 20,
    highlights: ["M2 Chip", "18 hrs battery", "Liquid Retina Display"],
    specifications: { RAM: "8GB", Storage: "256GB SSD", Processor: "Apple M2" },
  },
  {
    title: "boAt Rockerz 450 Bluetooth Headphone",
    description: "Wireless on-ear headphones with up to 15 hours playback.",
    brand: "boAt",
    category: "Electronics",
    price: 1299,
    mrp: 3990,
    discountPercent: 67,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"],
    stock: 100,
    highlights: ["15 Hrs Playback", "40mm Drivers", "Padded Ear Cushions"],
    specifications: { Battery: "15 hrs", Connectivity: "Bluetooth 5.0" },
  },
  {
    title: "Samsung Galaxy M14 5G (ICY Silver, 128GB)",
    description: "50MP camera, 6000mAh battery, 5G ready.",
    brand: "Samsung",
    category: "Mobiles",
    price: 13990,
    mrp: 17490,
    discountPercent: 20,
    images: ["https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600"],
    stock: 60,
    highlights: ["6000mAh Battery", "50MP Triple Camera", "5G Ready"],
    specifications: { RAM: "4GB", Storage: "128GB", Battery: "6000mAh" },
  },
  {
    title: "Prestige Deluxe Alpha Pressure Cooker, 5L",
    description: "Outer lid stainless steel pressure cooker, induction base.",
    brand: "Prestige",
    category: "Home & Kitchen",
    price: 2145,
    mrp: 3200,
    discountPercent: 33,
    images: ["https://images.unsplash.com/photo-1584990347449-a5d9f800a783?w=600"],
    stock: 80,
    highlights: ["Induction Base", "5 Year Warranty", "Virgin Aluminium"],
    specifications: { Capacity: "5L", Material: "Aluminium" },
  },
  {
    title: "Levi's Men's Slim Fit Jeans",
    description: "Classic slim fit denim jeans in dark blue wash.",
    brand: "Levi's",
    category: "Fashion",
    price: 1799,
    mrp: 3499,
    discountPercent: 48,
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=600"],
    stock: 120,
    highlights: ["Slim Fit", "100% Cotton", "Machine Wash"],
    specifications: { Fit: "Slim", Material: "Cotton" },
  },
];

const seed = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);

    const adminExists = await User.findOne({ email: "admin@flipkart.clone" });
    if (!adminExists) {
      await User.create({
        name: "Admin",
        email: "admin@flipkart.clone",
        password: "admin123",
        role: "admin",
      });
    }

    console.log("Seed data inserted successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
