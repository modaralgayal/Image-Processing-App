import { useState, useEffect } from "react";

export const Upload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!selectedImage) return setPreviewUrl(null);

    const url = URL.createObjectURL(selectedImage);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedImage]);

  const handleUpload = async () => {
    try {
      const res = await fetch("http://localhost:3000/upload", {
        method: "POST",
      });

      const data = await res.json();
      console.log(data);

      return data.message;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };

  return (
    <>
      <h1> Upload images here </h1>

      {selectedImage && (
        <div>
          {/* Display image here */}
          <img alt="not found" width={"500px"} src={previewUrl} />
          <br /> <br />
          <button onClick={() => setSelectedImage(null)}> Remove image </button>
        </div>
      )}

      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </>
  );
};
