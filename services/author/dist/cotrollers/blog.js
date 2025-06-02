import getBuffer from "../utils/dataUri.js";
import { sql } from "../utils/db.js";
import TryCatch from "../utils/TryCatch.js";
import cloudinary from "cloudinary";
export const createBlog = TryCatch(async (req, res) => {
    const { title, description, blogcontent, category } = req.body;
    const file = req.file;
    if (!file) {
        res.status(400).json({
            message: "No file to upload",
        });
        return;
    }
    const fileBuffer = getBuffer(file);
    if (!fileBuffer || !fileBuffer.content) {
        res.status(400).json({
            message: "Failed to generate buffer",
        });
        return;
    }
    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
        folder: "blogs",
    });
    const result = await sql `
        INSERT INTO blogs(title,description,image,blogcontent,category,author) VALUES (${title},${description},${cloud.secure_url},${blogcontent},${category},${req.user?._id}) RETURNING *`;
    res.json({
        message: "Blog created",
        blog: result[0],
    });
});
export const updateBlog = TryCatch(async (req, res) => {
    const { title, description, blogcontent, category } = req.body;
    const id = req.params.id;
    const file = req.file;
    if (!file) {
        res.status(400).json({
            message: "No file to upload",
        });
        return;
    }
    const blog = await sql `SELECT * FROM blogs WHERE id=${id}`;
    if (!blog.length) {
        res.status(400).json({
            message: "No blog with this id",
        });
        return;
    }
    if (blog[0].author !== req.user?._id) {
        res.status(400).json({
            message: "You are not author of this blog",
        });
        return;
    }
    let imageUrl = blog[0].image;
    const fileBuffer = getBuffer(file);
    if (!fileBuffer || !fileBuffer.content) {
        res.status(400).json({
            message: "Failed to generate buffer",
        });
        return;
    }
});
