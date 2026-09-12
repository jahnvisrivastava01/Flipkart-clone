# Flipkart Clone — MERN Stack

A full-stack e-commerce web application inspired by Flipkart, built using the MERN stack. The project includes a responsive shopping experience, authentication, product management, cart and checkout flow, order history, admin functionality, cloud image uploads, validation, rate limiting, automated API tests, and Google Sign-In.

---

## 🚀 Features

### 🛍️ Customer Features

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

### 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Google Sign-In using Firebase Authentication
- Frontend email and password validation
- Backend validation using Zod
- Protected routes
- Role-based authorization
- Admin authentication

### 👨‍💼 Admin Features

- Admin dashboard
- Add products
- Upload product images
- Product management
- View orders
- Update order statuses
- Protected admin routes

### ☁️ Cloud Image Uploads

Product images can be uploaded directly to Cloudinary instead of relying on pasted image URLs.

- Multer for file handling
- Cloudinary for cloud storage
- Image upload API
- 5 MB upload limit
- Secure Cloudinary URLs
- Product images stored using Cloudinary URLs

### 🛡️ Security

- Zod request validation
- JWT authentication
- Protected API routes
- Role-based authorization
- Authentication rate limiting
- General API rate limiting
- Environment variables for secrets
- Firebase service account excluded from Git
- `.gitignore` configured for sensitive files

### 🧪 Testing

Automated API tests using:

- Vitest
- Supertest

Current test coverage includes:

- Health check API
- Invalid registration email
- Short registration password
- Invalid login email
- Product listing API
- Unauthorized product creation

All current tests pass successfully.

---

## 🧰 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Firebase Authentication

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Zod
- Multer
- Cloudinary
- Express Rate Limit
- Firebase Admin SDK

### Testing

- Vitest
- Supertest

### Development Tools

- Git
- GitHub
- VS Code
- npm

---

## 📁 Project Structure

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
│   ├── serviceAccountKey.json
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
└── README.md
````

> **Note:** `backend/.env`, `frontend/.env`, and `backend/serviceAccountKey.json` contain private configuration and are excluded from Git.

---

# ⚙️ Backend Setup

## 1. Navigate to backend

```bash
cd backend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create environment file

Create:

```text
backend/.env
```

Example:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/flipkart-clone

JWT_SECRET=your_long_random_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Do not commit `.env` to GitHub.

---

## 4. MongoDB

Make sure MongoDB is running locally.

Default connection:

```text
mongodb://127.0.0.1:27017/flipkart-clone
```

Alternatively, you can use MongoDB Atlas by replacing `MONGO_URI` with your Atlas connection string.

---

## 5. Firebase Admin Setup

Google Sign-In uses Firebase Authentication on the frontend and Firebase Admin SDK on the backend.

### Create Firebase Project

1. Create a Firebase project.
2. Enable Google under:

```text
Authentication
→ Sign-in method
→ Google
```

3. Register a Web App in Firebase.

### Frontend Firebase Configuration

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

### Backend Firebase Configuration

Generate a Firebase Service Account key:

```text
Firebase Console
→ Project Settings
→ Service Accounts
→ Generate New Private Key
```

Save the downloaded file as:

```text
backend/serviceAccountKey.json
```

This file must **never be committed to GitHub**.

---

## 6. Seed the Database

Run:

```bash
npm run seed
```

This loads sample products and creates the default admin account.

---

## 7. Start Backend

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

## 1. Navigate to frontend

```bash
cd frontend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start development server

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

* Vitest for testing
* Supertest for API testing

Current test suites cover:

```text
✓ Health Check API
✓ Authentication validation
✓ Product API
✓ Unauthorized access protection
```

---

# ☁️ Cloudinary Image Upload

Admin users can upload product images through the admin panel.

The upload flow is:

```text
Admin selects image
        ↓
Frontend sends image
        ↓
Multer processes upload
        ↓
Express upload API
        ↓
Cloudinary
        ↓
Secure image URL
        ↓
Product saved in MongoDB
```

Supported image uploads are limited to 5 MB per file.

---

# 🛡️ API Security

The backend implements multiple security measures.

### Request Validation

Zod validates:

* Registration data
* Login data
* Product data
* Product reviews

### Rate Limiting

Authentication endpoints have stricter limits than general API endpoints.

```text
Authentication:
10 requests / 15 minutes

General API:
100 requests / 15 minutes
```

### Authentication

Protected endpoints use JWT authentication.

Admin-only operations additionally require admin authorization.

---

# 🔑 Authentication Flow

### Email/Password

```text
Register/Login
      ↓
Zod Validation
      ↓
MongoDB User
      ↓
JWT Token
      ↓
Authenticated User
```

### Google Sign-In

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

# 🖥️ Application Flow

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

Admin:

```text
Admin Login
    ↓
Admin Dashboard
    ↓
Add Product
    ↓
Upload Image to Cloudinary
    ↓
Manage Products
    ↓
Manage Orders
    ↓
Update Order Status
```

---

# 🔒 Environment & Secret Protection

The following files are intentionally excluded from Git:

```text
.env
.env.*
backend/serviceAccountKey.json
node_modules/
dist/
coverage/
```

The repository contains `.env.example` files so that other developers can understand which environment variables are required.

**Never upload Firebase service-account credentials, Cloudinary API secrets, JWT secrets, or other private credentials to GitHub.**

---

# 🚧 Payment Gateway

A real payment gateway has **not been implemented yet**.

The current checkout flow handles order creation without processing real payments.

A payment provider such as Razorpay or Stripe can be integrated in a future version.

---

# 🚀 Future Improvements

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
* Production deployment
* CI/CD pipeline
* Expanded automated test coverage

---

# 📌 Project Status

| Feature              | Status             |
| -------------------- | ------------------ |
| MERN architecture    | ✅ Complete         |
| Product catalog      | ✅ Complete         |
| Search & sorting     | ✅ Complete         |
| Pagination           | ✅ Complete         |
| Product details      | ✅ Complete         |
| Ratings & reviews    | ✅ Complete         |
| JWT authentication   | ✅ Complete         |
| Google Sign-In       | ✅ Complete         |
| Zod validation       | ✅ Complete         |
| Cloudinary uploads   | ✅ Complete         |
| Rate limiting        | ✅ Complete         |
| Cart                 | ✅ Complete         |
| Checkout             | ✅ Complete         |
| Order history        | ✅ Complete         |
| Admin panel          | ✅ Complete         |
| Dark/light mode      | ✅ Complete         |
| API testing          | ✅ Complete         |
| GitHub repository    | ✅ Complete         |
| Real payment gateway | ⏸️ Not implemented |

---

# 👩‍💻 Author

**Jahnvi Srivastava**

---

---

