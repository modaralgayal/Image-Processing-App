export const uploadImage = async (req, res) => {
  console.log("Uploading...");

  try {
    console.log("Uploaded successful");
    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? error,
    });
  }
};
