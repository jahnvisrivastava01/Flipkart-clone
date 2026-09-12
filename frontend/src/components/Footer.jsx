const Footer = () => (
  <footer className="bg-[#172337] text-gray-300 mt-8 py-8 text-sm">
    <div className="max-w-[1500px] mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-6">
      <div>
        <h4 className="text-gray-500 uppercase text-xs mb-2">About</h4>
        <ul className="space-y-1">
          <li>Contact Us</li>
          <li>About Us</li>
          <li>Careers</li>
        </ul>
      </div>
      <div>
        <h4 className="text-gray-500 uppercase text-xs mb-2">Help</h4>
        <ul className="space-y-1">
          <li>Payments</li>
          <li>Shipping</li>
          <li>Returns</li>
        </ul>
      </div>
      <div>
        <h4 className="text-gray-500 uppercase text-xs mb-2">Policy</h4>
        <ul className="space-y-1">
          <li>Return Policy</li>
          <li>Terms Of Use</li>
          <li>Privacy</li>
        </ul>
      </div>
      <div className="col-span-2">
        <h4 className="text-gray-500 uppercase text-xs mb-2">Mail Us</h4>
        <p>This is a student project — a MERN-stack clone built for learning purposes, not affiliated with Flipkart.</p>
      </div>
    </div>
    <p className="text-center text-gray-500 mt-6">© 2026 Flipkart Clone — built with MERN</p>
  </footer>
);

export default Footer;
