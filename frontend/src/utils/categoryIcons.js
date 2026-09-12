import {
  FaThLarge,
  FaTshirt,
  FaMobileAlt,
  FaLaptop,
  FaHome,
  FaShoppingBag,
} from "react-icons/fa";

const categoryIconMap = {
  Mobiles: FaMobileAlt,
  Laptops: FaLaptop,
  Electronics: FaLaptop,
  "Home & Kitchen": FaHome,
  Fashion: FaTshirt,
};

export const getCategoryIcon = (categoryName) => categoryIconMap[categoryName] || FaShoppingBag;

export const ForYouIcon = FaThLarge;
