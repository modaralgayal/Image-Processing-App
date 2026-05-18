import express from "express";
import { uploadImage } from "../services/uploadController.js";


const router = express.Router();

router.post("/", uploadImage);

export default router
