# Flipkart Clone — MERN Stack

Full-stack e-commerce app inspired by Flipkart's current UI. This is the
**complete, up-to-date version** with every feature discussed added in —
redesigned navbar/home page, dark mode, email/password validation, and a
working (click-based, not hover-based) logout menu.

## What's included

- Product catalog with icon-based category strip, search, sort, pagination
- Auto-sliding hero banner + scrollable promo tile row (with images)
- Product detail page with ratings & reviews
- JWT authentication (register/login), with Google Sign-In wired up but
  **optional** — the app runs fine without Firebase configured; the Google
  button just shows a friendly message until you add your credentials
- Email + password validation (frontend inline errors + backend enforcement)
- Cart (persisted in localStorage, requires login) → checkout → order history
- Admin panel: add products, manage order statuses
- Dark/light theme toggle
- Redesigned Login/Register pages with an illustration panel
- A **click-to-open navbar dropdown** (not hover-based) — this fixes the
  "logout menu disappears before I can click it" issue from hover-CSS menus,
  which also don't work reliably on touch devices

## Project structure

```
flipkart-clone/
  backend/     Express API + MongoDB (Mongoose)
  frontend/    React app (Vite + Tailwind)
```

## Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and fill in at minimum:
```
MONGO_URI=mongodb://127.0.0.1:27017/flipkart-clone
JWT_SECRET=any_long_random_string
```
Leave the `FIREBASE_*` lines blank for now — they're optional.

**Make sure MongoDB is actually running** before starting the server —
either `mongod` locally, or point `MONGO_URI` at a MongoDB Atlas cluster
instead. If you get `ECONNREFUSED 127.0.0.1:27017`, that's what's wrong.

```bash
npm run seed     # loads sample products + creates admin@flipkart.clone / admin123
npm run dev      # starts the API on http://localhost:5000
```

## Frontend setup

```bash
cd frontend
npm install
npm run dev      # starts the app on http://localhost:5173
```

The Vite dev server proxies `/api` to `http://localhost:5000` automatically.

## Default admin login

- Email: `admin@flipkart.clone`
- Password: `admin123`

Visit `/admin` after logging in as this user.

## Adding Google Sign-In later (optional)

1. Create a Firebase project, enable **Google** under Authentication → Sign-in method
2. Get your web app config from Project Settings → fill in `frontend/.env`
   (copy `frontend/.env.example` first) with the 6 `VITE_FIREBASE_*` values
3. Get a service account key from Project Settings → Service Accounts →
   Generate new private key → fill in the 3 `FIREBASE_*` values in `backend/.env`
4. Restart both servers

Nothing else needs to change — the code already checks for these and turns
Google Sign-In on automatically once configured.

## Notes / next steps

This is a learning-project scaffold, not a production system. Before
deploying: add input validation with a library like `zod`, real image
uploads (Cloudinary/S3) instead of pasted URLs, a real payment gateway,
rate limiting, and tests.
