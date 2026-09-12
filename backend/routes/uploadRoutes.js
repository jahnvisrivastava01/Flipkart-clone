import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
});

// @route POST /api/upload
router.post("/", protect, admin, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No image uploaded",
            });
        }

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "flipkart-clone/products",
                    resource_type: "image",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            stream.end(req.file.buffer);
        });

        res.json({
            url: result.secure_url,
            publicId: result.public_id,
        });
    } catch (err) {
        console.error("CLOUDINARY ERROR:", err);

        res.status(500).json({
            message: "Image upload failed",
            error: err.message,
        });
    }
});

export default router ;