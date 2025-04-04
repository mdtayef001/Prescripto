import axios from "axios";
import { toast } from "react-toastify";

const imgUpload = async (imageData) => {
  if (!imageData) return toast.error("Image is not selected");
  const formData = new FormData();
  formData.append("file", imageData);
  formData.append("upload_preset", "prescripto");

  try {
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_cloudinary_CLOUD_NAME
      }/image/upload`,
      formData
    );
    return data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error("Image upload failed");
    return null;
  }
};

export { imgUpload };
