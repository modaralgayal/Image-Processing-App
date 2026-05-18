import multer from "multer";
import { Queue } from "bullmq";

const connection = {
  host: "localhost",
  port: 6379,
};

const myQueue = new Queue("images", {connection});

export const uploadImage = async (req, res) => {
  console.log("Uploading...");
  console.log(req.file);

  try {
    const imagePath = req.file.path;
    console.log(imagePath);
    if (!req.file) {
      return res.status(400).json({ message: "no file uploaded" });
    }

    const job = await myQueue.add("image", { path: imagePath });

    console.log("Uploaded successful");
    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully to backend",
      jobId: job.id,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? error,
    });
  }
};
