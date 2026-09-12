import admin from "firebase-admin";
import dotenv from "dotenv";
import serviceAccount from "../serviceAccountKey.json" with { type: "json" };

dotenv.config();

export const isFirebaseConfigured = true;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;