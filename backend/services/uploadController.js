import multer from "multer";


export const uploadImage = async (req, res) => {
  console.log("Uploading...");
  console.log(req.file);


  try {
    console.log(req.file);

    if (!req.file) {
      return res.status(400).json({ message: "no file uploaded" });
    }

    console.log("Uploaded successful");
    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully to backend",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? error,
    });
  }
};
