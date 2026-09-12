# 🛒 Flipkart Clone — MERN Stack

A full-stack e-commerce web application inspired by Flipkart, built using the **MERN stack**. The project includes a responsive shopping experience, authentication, product management, cart and checkout flow, order history, admin functionality, cloud image uploads, validation, rate limiting, automated API testing, Google Sign-In, and production deployment.

---

## 🚀 Live Demo

<p align="center">

<a href="https://flipkart-clone-eight-jet.vercel.app/">
  <img src="https://img.shields.io/badge/FLIPKART%20CLONE-10B981?style=for-the-badge&logo=vercel&logoColor=white" />
</a>

</p>

### 🌐 Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas
- **Image Storage:** Cloudinary
- **Authentication:** Firebase Authentication + JWT

---

# ✨ Features

## 🛍️ Customer Features

- Product catalog
- Category-based product browsing
- Product search
- Product sorting
- Pagination
- Auto-sliding hero banner
- Promotional product tiles
- Product detail pages
- Product ratings and reviews
- Add products to cart
- Persistent cart using `localStorage`
- Login required for checkout
- Checkout flow
- Order history
- Dark/light theme toggle
- Responsive UI
- Interactive navigation and dropdowns
- Product hover animations
- Smooth page and component animations

---

## 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Google Sign-In using Firebase Authentication
- Frontend email and password validation
- Backend validation using Zod
- Protected routes
- Role-based authorization
- Admin authentication

### Email/Password Authentication Flow

```text
Register / Login
      ↓
Zod Validation
      ↓
MongoDB User
      ↓
JWT Token
      ↓
Authenticated User
````

### Google Sign-In Flow

```text
Google Account
      ↓
Firebase Authentication
      ↓
Firebase ID Token
      ↓
Backend /api/auth/google
      ↓
Firebase Admin verifies token
      ↓
User created/found in MongoDB
      ↓
JWT Token generated
      ↓
Authenticated User
```

---

# 👨‍💼 Admin Features

* Admin dashboard
* Add products
* Edit existing products
* Delete products
* Upload product images
* Manage product information
* View orders
* Update order statuses
* Protected admin routes
* Role-based admin authorization

### Admin Product Management

```text
Admin Login
     ↓
Admin Dashboard
     ↓
Add / Edit Product
     ↓
Upload Product Image
     ↓
Cloudinary
     ↓
Product Saved in MongoDB
```

---

# ☁️ Cloudinary Image Uploads

Product images can be uploaded directly from the admin panel to **Cloudinary** instead of relying on manually pasted image URLs.

### Upload Flow

```text
Admin selects image
        ↓
Frontend sends image
        ↓
Multer processes upload
        ↓
Express Upload API
        ↓
Cloudinary
        ↓
Secure Image URL
        ↓
Product saved in MongoDB
```

### Upload Features

* Multer for file handling
* Cloudinary cloud storage
* Dedicated image upload API
* Maximum file size: **5 MB**
* Secure Cloudinary URLs
* Cloudinary URLs stored with products

---

# 🛡️ Security

The backend implements multiple security mechanisms.

### Request Validation

**Zod** is used to validate:

* Registration data
* Login data
* Product data
* Product reviews

### Authentication

* JWT authentication
* Protected API routes
* Admin-only authorization
* Firebase ID token verification for Google Sign-In

### Rate Limiting

Authentication endpoints have stricter limits than general API endpoints.

```text
Authentication:
10 requests / 15 minutes

General API:
100 requests / 15 minutes
```

### Environment Variables

Sensitive configuration is stored using environment variables instead of being committed to GitHub.

Sensitive values include:

* MongoDB connection string
* JWT secret
* Cloudinary API secret
* Firebase private credentials

---

# 🧪 Automated API Testing

The backend uses:

* **Vitest**
* **Supertest**

Current tests include:

```text
✓ Health Check API
✓ Invalid registration email
✓ Short registration password
✓ Invalid login email
✓ Product listing API
✓ Unauthorized product creation
```

### Test Result

```text
6 / 6 tests passing
```

Run tests using:

```bash
npm test
```

---

# 🧰 Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router
* Firebase Authentication

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Zod
* Multer
* Cloudinary
* Express Rate Limit
* Firebase Admin SDK

## Testing

* Vitest
* Supertest

## Deployment

* Vercel
* Render
* MongoDB Atlas
* Cloudinary

## Development Tools

* Git
* GitHub
* VS Code
* npm

---

# 📁 Project Structure

```text
flipkart-clone/
│
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── firebaseAdmin.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   └── rateLimiter.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   └── uploadRoutes.js
│   │
│   ├── validators/
│   │   ├── authValidator.js
│   │   └── productValidator.js
│   │
│   ├── tests/
│   │   ├── health.test.js
│   │   ├── auth.test.js
│   │   └── product.test.js
│   │
│   ├── seed/
│   │   └── seedData.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── firebase.js
│   │   └── ...
│   │
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── README.md
└── ...
```

> **Note:** `.env` files contain private configuration and are excluded from Git.

---

# ⚙️ Backend Setup

## 1. Navigate to Backend

```bash
cd backend
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Create Environment File

Create:

```text
backend/.env
```

Add:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/flipkart-clone

JWT_SECRET=your_long_random_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="your_private_key"
```

> Never commit `.env` to GitHub.

---

# 🍃 MongoDB Setup

The application supports both local MongoDB and MongoDB Atlas.

### Local MongoDB

Default connection:

```text
mongodb://127.0.0.1:27017/flipkart-clone
```

### MongoDB Atlas

For production, replace `MONGO_URI` with your MongoDB Atlas connection string.

Example:

```env
MONGO_URI=your_mongodb_atlas_connection_string
```

---

# 🔥 Firebase Setup

Google Sign-In uses:

* **Firebase Authentication** on the frontend
* **Firebase Admin SDK** on the backend

## 1. Create Firebase Project

Create a project in Firebase Console.

Enable Google Sign-In:

```text
Firebase Console
→ Authentication
→ Sign-in method
→ Google
→ Enable
```

Register a Web App in the Firebase project.

---

## 2. Frontend Firebase Configuration

Create:

```text
frontend/.env
```

Add:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

These variables are used by the React frontend to initialize Firebase Authentication.

---

## 3. Backend Firebase Configuration

The backend uses **Firebase Admin SDK** to verify Google Sign-In ID tokens.

Add the following to:

```text
backend/.env
```

```env
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="your_private_key"
```

These values can be obtained from:

```text
Firebase Console
→ Project Settings
→ Service Accounts
→ Generate New Private Key
```

Map the service-account JSON fields:

```text
project_id
     ↓
FIREBASE_PROJECT_ID

client_email
     ↓
FIREBASE_CLIENT_EMAIL

private_key
     ↓
FIREBASE_PRIVATE_KEY
```

For production deployment, these values should be configured securely through the hosting platform's environment variables.

> **Never commit Firebase private credentials or service-account files to GitHub.**

---

# 🌱 Seed the Database

From the backend directory:

```bash
npm run seed
```

The seed script:

* Adds sample products
* Creates the default administrator account

### Default Admin

The administrator credentials are intentionally **not documented in this public repository**.

Use secure credentials when configuring the application.

---

# ▶️ Start Backend

Run:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

# 💻 Frontend Setup

Open another terminal.

## 1. Navigate to Frontend

```bash
cd frontend
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Start Development Server

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

The Vite development server proxies `/api` requests to the backend.

---

# 🧪 Running Tests

Navigate to the backend:

```bash
cd backend
```

Run:

```bash
npm test
```

The project uses:

* Vitest for unit/API testing
* Supertest for HTTP API testing

Current test suites cover:

```text
✓ Health Check API
✓ Authentication validation
✓ Product API
✓ Unauthorized access protection
```

---

# 📡 Main API Routes

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/google
```

## Products

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
POST   /api/products/:id/reviews
```

## Orders

```text
POST /api/orders
GET  /api/orders/myorders
GET  /api/orders
PUT  /api/orders/:id/status
```

## Image Upload

```text
POST /api/upload
```

## Health Check

```text
GET /api/health
```

---

# 🛒 Application Flow

## Customer Flow

```text
Home Page
   ↓
Browse Products
   ↓
Product Details
   ↓
Add to Cart
   ↓
Login
   ↓
Checkout
   ↓
Place Order
   ↓
Order History
```

## Admin Flow

```text
Admin Login
    ↓
Admin Dashboard
    ↓
Add / Edit Product
    ↓
Upload Image
    ↓
Cloudinary
    ↓
Manage Products
    ↓
Manage Orders
    ↓
Update Order Status
```

---

# ☁️ Production Deployment

The project is deployed using:

```text
Frontend
     ↓
Vercel

Backend
     ↓
Render

Database
     ↓
MongoDB Atlas

Images
     ↓
Cloudinary
```

### Frontend Environment Variable

For production:

```env
VITE_API_URL=https://flipkart-clone-0noh.onrender.com/api
```

### Backend Environment Variable

The backend uses:

```env
CLIENT_URL=https://flipkart-clone-eight-jet.vercel.app
```

along with the required MongoDB, JWT, Cloudinary, and Firebase environment variables.

---

# 🔒 Environment & Secret Protection

The following are intentionally excluded from Git:

```text
.env
.env.*
node_modules/
dist/
build/
coverage/
*.log
```

Firebase private credentials are also kept outside the repository.

The repository contains `.env.example` files to show developers which environment variables are required.

> **Never upload Firebase private credentials, Cloudinary API secrets, MongoDB passwords, JWT secrets, or other private credentials to GitHub.**

---

# 💳 Payment Gateway

A real payment gateway has **not been implemented yet**.

The current checkout flow handles order creation without processing real payments.

A payment provider such as Razorpay or Stripe can be integrated in a future version.

---

# 🚧 Future Improvements

Possible future enhancements include:

* Real payment gateway integration
* Product wishlist
* Product comparison
* Advanced filtering
* Coupon and discount system
* Inventory management
* Email order notifications
* Seller dashboard
* Product recommendations
* Improved admin analytics
* CI/CD pipeline
* Expanded automated test coverage

---

# 📊 Project Status

| Feature                 | Status             |
| ----------------------- | ------------------ |
| MERN architecture       | ✅ Complete         |
| Product catalog         | ✅ Complete         |
| Search & sorting        | ✅ Complete         |
| Pagination              | ✅ Complete         |
| Product details         | ✅ Complete         |
| Ratings & reviews       | ✅ Complete         |
| JWT authentication      | ✅ Complete         |
| Google Sign-In          | ✅ Complete         |
| Firebase Authentication | ✅ Complete         |
| Zod validation          | ✅ Complete         |
| Cloudinary uploads      | ✅ Complete         |
| Rate limiting           | ✅ Complete         |
| Cart                    | ✅ Complete         |
| Checkout                | ✅ Complete         |
| Order history           | ✅ Complete         |
| Admin panel             | ✅ Complete         |
| Product editing         | ✅ Complete         |
| Product deletion        | ✅ Complete         |
| Dark/light mode         | ✅ Complete         |
| API testing             | ✅ Complete         |
| MongoDB Atlas           | ✅ Complete         |
| Backend deployment      | ✅ Complete         |
| Frontend deployment     | ✅ Complete         |
| Real payment gateway    | ⏸️ Not implemented |

---

# 📌 Key Highlights

This project demonstrates practical experience with:

* Full-stack MERN development
* REST API development
* JWT authentication
* Firebase Google Authentication
* Role-based authorization
* MongoDB and Mongoose
* Cloudinary image management
* Zod backend validation
* API rate limiting
* Automated API testing
* React routing
* Tailwind CSS
* Responsive UI development
* Git and GitHub
* Vercel deployment
* Render deployment
* MongoDB Atlas
* Environment and secret management

---

# 👩‍💻 Author

**Jahnvi Srivastava**



---

